import { redirect } from "next/navigation";
import { SHOP } from "@/lib/shop";

export default function BookPage() {
  redirect(SHOP.bookingUrl);
}
