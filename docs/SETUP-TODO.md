# Setup TODO — Credentials Needed

This project's scaffolding is in place. The remaining steps all require credentials/accounts that need interactive sign-up. When you open this project in Claude Code (`cd ~/heather-coaching && claude`), work through these in order.

## 1. Supabase (database + auth + storage)

**What it does:** Stores bookings, clients, session packages, and handles login.

**Steps:**
1. Sign up at https://supabase.com (use GitHub login)
2. Create a new project named `heather-coaching`
   - Choose a region close to Heather's clients (probably `us-west-1` or `us-east-1`)
   - Save the database password to 1Password/Bitwarden — you'll need it
3. Once ready, run in Terminal:
   ```
   supabase login
   supabase link --project-ref <YOUR_PROJECT_REF>
   ```
4. Tell Claude Code: "run the initial migrations and scaffold the booking tables"

## 2. Stripe (accepting payments)

**What it does:** Lets clients purchase session packages.

**Steps:**
1. Sign up at https://dashboard.stripe.com/register
2. In **Test mode** (top-right toggle), go to Developers → API keys
3. Copy the **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`)
4. Hand both to Claude Code — it'll wire them into Supabase edge function secrets

Fees: 2.9% + 30¢ per card, 0.8% for ACH. Test mode is free forever.

## 3. Resend (transactional email)

**What it does:** Sends booking confirmations, payment receipts, reminders.

**Steps:**
1. Sign up at https://resend.com/signup (free tier: 3,000 emails/month)
2. Go to API Keys → Create API Key → full access, name it "heather-coaching"
3. Copy the key (`re_...`) and hand to Claude Code
4. Verify Heather's sending domain later (can start with `onboarding@resend.dev` for testing)

## 4. Scheduling feature (custom on Supabase)

Once Supabase is linked, Claude Code will:
- Create `availability`, `bookings`, `session_packages` tables
- Build a booking page (`/book/`) with calendar picker
- Admin dashboard for Heather to set availability and view upcoming sessions
- Integrate Stripe checkout for package purchase before booking

## 5. Domain (optional, later)

Project will live at https://laurenbur2.github.io/heather-coaching/ by default. If Heather has a domain (e.g., `heathercoaching.com`), configure it in:
- GitHub repo → Settings → Pages → Custom domain
- DNS: CNAME `www` → `laurenbur2.github.io`
