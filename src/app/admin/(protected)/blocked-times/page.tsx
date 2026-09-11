import { createClient } from "@/lib/supabase/server";
import { getBarbers } from "@/lib/data";
import { formatSlotDate, formatSlotTime } from "@/lib/format";
import { addBlockedTime, deleteBlockedTime } from "@/app/admin/actions";

export default async function BlockedTimesPage() {
  const supabase = await createClient();
  const barbers = await getBarbers();

  const { data: blocks } = await supabase
    .from("blocked_times")
    .select("*, barbers(name)")
    .gte("end_at", new Date().toISOString())
    .order("start_at");

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-bone">
        TIME OFF & BLOCKS
      </h1>
      <p className="mt-2 max-w-lg text-sm text-steel">
        Block off a barber&apos;s calendar for lunch, vacation, or anything
        else — those slots stop showing up in booking.
      </p>

      <form
        action={addBlockedTime}
        className="card-edge mt-6 grid gap-4 bg-ink-soft p-6 sm:grid-cols-2"
      >
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-steel">
            Barber
          </span>
          <select
            name="barberId"
            required
            className="mt-1 w-full border border-ink-line bg-ink px-3 py-2 text-bone focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
          >
            {barbers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-steel">
            Reason (optional)
          </span>
          <input
            name="reason"
            placeholder="Vacation, lunch, etc."
            className="mt-1 w-full border border-ink-line bg-ink px-3 py-2 text-bone placeholder:text-steel focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-steel">
            Start
          </span>
          <input
            type="datetime-local"
            name="startAt"
            required
            className="mt-1 w-full border border-ink-line bg-ink px-3 py-2 text-bone focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-steel">
            End
          </span>
          <input
            type="datetime-local"
            name="endAt"
            required
            className="mt-1 w-full border border-ink-line bg-ink px-3 py-2 text-bone focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
          />
        </label>
        <button
          type="submit"
          className="sm:col-span-2 bg-blood px-6 py-3 font-display tracking-wider text-bone transition hover:bg-blood-dark"
        >
          ADD BLOCK
        </button>
      </form>

      <div className="mt-8 card-edge divide-y divide-ink-line bg-ink-soft">
        {!blocks || blocks.length === 0 ? (
          <p className="p-6 text-sm text-steel">No upcoming blocks.</p>
        ) : (
          blocks.map((blk) => (
            <div
              key={blk.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div>
                <p className="text-bone">
                  {(blk as unknown as { barbers: { name: string } }).barbers
                    ?.name}{" "}
                  <span className="text-steel">
                    — {blk.reason || "Time off"}
                  </span>
                </p>
                <p className="text-xs text-steel">
                  {formatSlotDate(blk.start_at)} · {formatSlotTime(blk.start_at)}
                  {" – "}
                  {formatSlotTime(blk.end_at)}
                </p>
              </div>
              <form action={deleteBlockedTime.bind(null, blk.id)}>
                <button className="text-xs uppercase tracking-wider text-blood-light hover:underline">
                  Remove
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
