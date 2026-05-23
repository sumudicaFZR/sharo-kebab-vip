export type Business = {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  whatsapp_number: string;
  google_review_url: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  created_at: string;
};

export type MenuItem = {
  id: string;
  business_id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  created_at: string;
};

export type GramajLine = {
  label: string;
  value: string;
};

export type ProductGramaj = {
  template: string;
  total: string;
  lines: GramajLine[];
  note?: string;
};

export type Customer = {
  id: string;
  business_id: string;
  name: string;
  phone: string;
  referral_code: string;
  referred_by: string | null;
  total_points: number;
  total_visits: number;
  created_at: string;
  last_visit_at: string | null;
};

export type Offer = {
  id: string;
  business_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
};

export type Reward = {
  id: string;
  business_id: string;
  customer_id: string;
  reward_name: string;
  points_required: number;
  status: "available" | "claimed" | "locked";
  claimed_at: string | null;
  created_at: string;
};
