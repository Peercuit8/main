# ⚡ Peercuit — Student Builder Community Website

> **Positioning:** Peercuit is a curated community for high school and college students to find like-minded peers, receive real feedback on their work, discover opportunities, and build things together.

---

## ✨ Features & Architecture

- **Brand & Theme**:
  - **Actual Logo**: Rendered across Navbar, Footer, and Favicon/Meta using [`public/logo.png`](public/logo.png).
  - **Dedicated Light & Dark Modes**: Complete tailored color palettes (no CSS color inversions) with a Sun/Moon toggle.
  - **Honest Principles**: Transparent community metrics with zero fake testimonials.

- **Authentication (Firebase Google Auth)**:
  - **Google Sign-In**: Powered by Firebase Auth with one-click popup authentication.
  - **Autofill Form**: Students can one-click sign in with Google to pre-fill their name, email, and link their application ID.
  - **User Navigation**: Dropdown menu in header with avatar, email display, and sign-out.

- **Database (Supabase)**:
  - **First-Class Storage**: Automatically stores submissions into Supabase PostgreSQL `applications` table.
  - **Graceful Fallback**: Automatically saves to local persistent JSON (`data/submissions.json`) if Supabase is unconfigured in development.
  - **SQL Migration**: Included in [`supabase/schema.sql`](supabase/schema.sql).

- **Transactional Email (Resend)**:
  - Admin notification email with full applicant breakdown.
  - Confirmation receipt email sent to the applicant.
  - Safe terminal mock preview in development when API key is unset.

---

## 🚀 Setup & Environment Variables

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your service keys:

```env
# Resend Email (https://resend.com)
RESEND_API_KEY=re_your_resend_api_key
ADMIN_EMAIL=team@peercuit.com
FROM_EMAIL=Peercuit Community <onboarding@resend.dev>

# Firebase Google Auth (https://console.firebase.google.com)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Supabase Database (https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Initialize Supabase Database
In your Supabase Dashboard:
1. Open the **SQL Editor**.
2. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql).

---

## 💻 Development & Production

```bash
# Start Development Server
npm run dev

# Build for Production
npm run build
npm run start
```
