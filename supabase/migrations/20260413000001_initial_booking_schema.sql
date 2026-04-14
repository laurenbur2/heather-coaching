-- Heather Coaching — Initial booking schema
-- Tables: clients, session_packages, purchases, availability, availability_overrides, bookings

-- ============================================================================
-- Clients (extends auth.users)
-- ============================================================================
create table if not exists public.clients (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  timezone text default 'America/Los_Angeles',
  intake_notes text,
  is_archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists clients_email_idx on public.clients(email);

-- ============================================================================
-- Session packages (what Heather sells)
-- ============================================================================
create table if not exists public.session_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,                    -- "Single Session", "3-Session Package", etc.
  description text,
  session_count int not null default 1,  -- how many sessions are in this package
  duration_minutes int not null default 60,
  price_cents int not null,              -- price in cents (e.g. 15000 = $150.00)
  currency text not null default 'usd',
  is_published boolean default false,    -- show on site?
  is_archived boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists session_packages_published_idx on public.session_packages(is_published) where is_archived = false;

-- ============================================================================
-- Purchases (record of package sales, linked to Stripe)
-- ============================================================================
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  package_id uuid references public.session_packages(id) on delete restrict,
  sessions_total int not null,            -- snapshot at purchase time
  sessions_remaining int not null,        -- decremented when bookings are made
  amount_cents int not null,
  currency text not null default 'usd',
  stripe_session_id text unique,          -- Stripe Checkout session ID
  stripe_payment_intent_id text,
  status text not null default 'pending', -- pending, paid, refunded, failed
  paid_at timestamptz,
  is_archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists purchases_client_idx on public.purchases(client_id);
create index if not exists purchases_status_idx on public.purchases(status);

-- ============================================================================
-- Availability (Heather's recurring weekly availability)
-- ============================================================================
create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6), -- 0=Sun, 6=Sat
  start_time time not null,
  end_time time not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================================
-- Availability overrides (blocked dates, special hours)
-- ============================================================================
create table if not exists public.availability_overrides (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  is_blocked boolean default true,       -- true = day off; false = custom hours
  start_time time,                       -- only used if is_blocked = false
  end_time time,
  reason text,                           -- "vacation", "retreat", etc.
  created_at timestamptz default now()
);

create index if not exists availability_overrides_date_idx on public.availability_overrides(date);

-- ============================================================================
-- Bookings (scheduled sessions)
-- ============================================================================
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  purchase_id uuid references public.purchases(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  duration_minutes int not null default 60,
  status text not null default 'confirmed', -- confirmed, completed, cancelled, no_show
  session_notes text,                       -- private, Heather-only notes
  client_intake text,                       -- what client shares before session
  meeting_link text,                        -- Zoom/Meet URL
  cancelled_at timestamptz,
  cancellation_reason text,
  is_archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists bookings_client_idx on public.bookings(client_id);
create index if not exists bookings_starts_at_idx on public.bookings(starts_at);
create index if not exists bookings_status_idx on public.bookings(status);

-- ============================================================================
-- Updated-at triggers
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger session_packages_updated_at before update on public.session_packages for each row execute function public.set_updated_at();
create trigger purchases_updated_at before update on public.purchases for each row execute function public.set_updated_at();
create trigger bookings_updated_at before update on public.bookings for each row execute function public.set_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.clients enable row level security;
alter table public.session_packages enable row level security;
alter table public.purchases enable row level security;
alter table public.availability enable row level security;
alter table public.availability_overrides enable row level security;
alter table public.bookings enable row level security;

-- session_packages: public can read published non-archived packages
create policy "public read published packages" on public.session_packages
  for select using (is_published = true and is_archived = false);

-- availability: public can read (so site can show available times)
create policy "public read availability" on public.availability
  for select using (is_active = true);

create policy "public read availability overrides" on public.availability_overrides
  for select using (true);

-- clients: users can read/update their own client row
create policy "users read own client" on public.clients
  for select using (auth.uid() = id);

create policy "users update own client" on public.clients
  for update using (auth.uid() = id);

-- purchases: users can read their own purchases
create policy "users read own purchases" on public.purchases
  for select using (auth.uid() = client_id);

-- bookings: users can read their own bookings
create policy "users read own bookings" on public.bookings
  for select using (auth.uid() = client_id);

-- NOTE: admin write access is handled by edge functions using the service_role key.
-- No admin RLS policies needed here because service_role bypasses RLS.
