create extension if not exists "pgcrypto";

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  address text not null,
  phone text,
  whatsapp_number text,
  google_review_url text,
  logo_url text,
  primary_color text default '#ff7a1a',
  secondary_color text default '#e12d21',
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  phone text not null,
  referral_code text not null unique,
  referred_by text,
  total_points integer not null default 0,
  total_visits integer not null default 0,
  created_at timestamptz not null default now(),
  last_visit_at timestamptz,
  unique (business_id, phone)
);

create table public.visits (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  points_added integer not null default 1,
  source text not null default 'qr',
  created_at timestamptz not null default now()
);

create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  reward_name text not null,
  points_required integer not null,
  status text not null default 'available' check (status in ('locked', 'available', 'claimed')),
  claimed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  title text not null,
  description text not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  category text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  referrer_customer_id uuid not null references public.customers(id) on delete cascade,
  referred_customer_id uuid references public.customers(id) on delete set null,
  referral_code text not null,
  bonus_points integer not null default 1,
  status text not null default 'pending' check (status in ('pending', 'awarded')),
  created_at timestamptz not null default now()
);

create table public.qr_scans (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  qr_type text not null,
  device text,
  created_at timestamptz not null default now()
);

create table public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  prompt text not null,
  response text not null,
  type text not null,
  created_at timestamptz not null default now()
);

create table public.review_clicks (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.whatsapp_clicks (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.private_feedback (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  phone text not null,
  rating integer not null check (rating between 1 and 5),
  message text not null,
  created_at timestamptz not null default now()
);

create table public.staff_qr_tokens (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  token text not null unique,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  created_by text
);

create table public.stamp_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  source text not null default 'secret_staff_qr' check (source in ('secret_staff_qr')),
  token_id uuid references public.staff_qr_tokens(id) on delete set null,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

alter table public.businesses enable row level security;
alter table public.customers enable row level security;
alter table public.visits enable row level security;
alter table public.rewards enable row level security;
alter table public.offers enable row level security;
alter table public.menu_items enable row level security;
alter table public.referrals enable row level security;
alter table public.qr_scans enable row level security;
alter table public.ai_generations enable row level security;
alter table public.review_clicks enable row level security;
alter table public.whatsapp_clicks enable row level security;
alter table public.private_feedback enable row level security;
alter table public.staff_qr_tokens enable row level security;
alter table public.stamp_events enable row level security;

create policy "Public can read active business" on public.businesses for select using (true);
create policy "Public can read active offers" on public.offers for select using (active = true);
create policy "Public can read menu" on public.menu_items for select using (true);

create policy "Admin full businesses" on public.businesses for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full customers" on public.customers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full visits" on public.visits for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full rewards" on public.rewards for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full offers" on public.offers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full menu" on public.menu_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full referrals" on public.referrals for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full analytics" on public.qr_scans for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full ai" on public.ai_generations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full review clicks" on public.review_clicks for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full whatsapp clicks" on public.whatsapp_clicks for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full feedback" on public.private_feedback for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full staff qr tokens" on public.staff_qr_tokens for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full stamp events" on public.stamp_events for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create index customers_business_phone_idx on public.customers (business_id, phone);
create index visits_customer_created_idx on public.visits (customer_id, created_at desc);
create index qr_scans_business_created_idx on public.qr_scans (business_id, created_at desc);
create index staff_qr_tokens_business_active_idx on public.staff_qr_tokens (business_id, active, created_at desc);
create index stamp_events_business_created_idx on public.stamp_events (business_id, created_at desc);
create index stamp_events_customer_created_idx on public.stamp_events (customer_id, created_at desc);
