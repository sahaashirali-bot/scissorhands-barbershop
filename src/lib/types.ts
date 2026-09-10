export type Barber = {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  bio: string | null;
  years_experience: number | null;
  photo_url: string | null;
  rating: number | null;
  review_count: number;
  sort_order: number;
  active: boolean;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  category: string;
  sort_order: number;
  active: boolean;
};

export type Review = {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  barber_name: string | null;
  source: string | null;
  created_at: string;
};

export type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type PaymentMethod = "online" | "in_shop";

export type Booking = {
  id: string;
  confirmation_code: string;
  barber_id: string;
  service_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  no_preference: boolean;
  start_at: string;
  end_at: string;
  status: BookingStatus;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  deposit_amount_cents: number;
  total_amount_cents: number;
  card_fee_cents: number;
  notes: string | null;
  payment_method: PaymentMethod;
  created_at: string;
  updated_at: string;
};

export type ShopHours = {
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
};
