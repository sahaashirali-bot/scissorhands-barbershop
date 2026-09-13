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

export type ShopHours = {
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
};
