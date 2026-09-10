import { NextRequest, NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/anon";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");
  const barberId = searchParams.get("barberId");

  if (!serviceId || !date || !barberId) {
    return NextResponse.json(
      { error: "serviceId, date, and barberId are required" },
      { status: 400 }
    );
  }

  const supabase = createAnonClient();

  let barberIds: string[];
  if (barberId === "any") {
    const { data, error } = await supabase
      .from("barbers")
      .select("id")
      .eq("active", true);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    barberIds = data.map((b) => b.id);
  } else {
    barberIds = [barberId];
  }

  const results = await Promise.all(
    barberIds.map(async (id) => {
      const { data, error } = await supabase.rpc("get_open_slots", {
        p_barber_id: id,
        p_service_id: serviceId,
        p_date: date,
      });
      if (error) throw error;
      return (data as { slot_start: string }[]).map((row) => ({
        start: row.slot_start,
        barberId: id,
      }));
    })
  );

  const slots = results
    .flat()
    .sort((a, b) => a.start.localeCompare(b.start));

  // De-duplicate identical start times (e.g. "any barber" mode), keeping
  // the first barber offering that time.
  const seen = new Set<string>();
  const deduped =
    barberId === "any"
      ? slots.filter((s) => {
          if (seen.has(s.start)) return false;
          seen.add(s.start);
          return true;
        })
      : slots;

  return NextResponse.json({ slots: deduped });
}
