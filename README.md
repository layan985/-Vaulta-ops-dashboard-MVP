# Flowdesk — Booking & Approval Platform

A production-grade MVP booking system with admin approval workflow. Built with Next.js, TypeScript, and Supabase. Perfect for managing appointments, bookings, and client requests.

## Features

- 📅 **Public Booking Flow** - Clean booking form for clients to request appointments
- ✅ **Admin Dashboard** - Overview with booking statistics and recent activity
- 🔐 **Admin Authentication** - Secure email/password authentication with Supabase
- 📋 **Booking Management** - Approve/reject bookings with status tracking
- 📊 **Availability Calendar** - Weekly availability management with time slot toggles
- ⚙️ **Settings** - Business information and notification preferences
- 🎨 **Modern UI** - Clean, professional design with CSS Modules
- 🛡️ **Route Protection** - Protected dashboard routes with auth guards
- ⚡ **Performance** - Optimized with Next.js App Router and Suspense
- 💼 **Production Ready** - Professional repo structure suitable for portfolio

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Styling**: CSS Modules (no Tailwind)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/flowdesk.git
cd flowdesk
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Set up Supabase tables (see below)

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

### Required Tables

Create these tables in your Supabase SQL Editor:

#### `bookings`
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for booking form)
CREATE POLICY "Allow public inserts" ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all bookings
CREATE POLICY "Allow authenticated reads" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update bookings
CREATE POLICY "Allow authenticated updates" ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);
```

#### `availability` (optional - for future use)
```sql
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(date, time)
);

-- Enable Row Level Security (RLS)
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage availability
CREATE POLICY "Allow authenticated access" ON availability
  FOR ALL
  TO authenticated
  USING (true);
```

### Authentication Setup

1. Go to Authentication > Settings in your Supabase dashboard
2. Enable Email provider
3. Configure email templates (optional)
4. Create your first admin user via Authentication > Users > Add User

## Project Structure

```
src/
  app/
    page.tsx                    # Public landing page
    layout.tsx                  # Root layout
    globals.css                 # Global styles
    (public)/
      book/page.tsx             # Public booking form
      success/page.tsx          # Booking success page
    (auth)/
      login/page.tsx            # Admin login page
    (dashboard)/
      layout.tsx                # Dashboard layout (protected)
      dashboard/page.tsx        # Dashboard overview
      bookings/page.tsx         # Bookings management
      availability/page.tsx     # Availability calendar
      settings/page.tsx         # Settings
  components/
    layout/
      Sidebar.tsx               # Navigation sidebar
      Topbar.tsx                # Top navigation bar
    ui/
      Button.tsx                # Button component
      Input.tsx                 # Input component
      Select.tsx                # Select component
      Card.tsx                  # Card component
      Badge.tsx                 # Badge component
      Skeleton.tsx              # Loading skeleton
    tables/
      BookingsTable.tsx         # Bookings table component
    calendar/
      AvailabilityCalendar.tsx  # Availability calendar component
  lib/
    supabase/
      client.ts                 # Browser Supabase client
      server.ts                 # Server Supabase client
    auth/
      actions.ts                # Auth server actions
      guards.ts                 # Route protection guards
    bookings/
      queries.ts                # Booking queries
      mutations.ts              # Booking mutations
    utils/
      cn.ts                     # Class name utility
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### Public Booking Flow

- Route: `/book`
- Form fields: Name, Email, Date, Time, Notes (optional)
- Creates booking with `pending` status
- Redirects to `/success` page

### Admin Dashboard

- Route: `/dashboard` (protected)
- Overview cards: Pending, Approved, Rejected, Total bookings
- Recent bookings preview
- Quick navigation to bookings management

### Booking Management

- Route: `/dashboard/bookings` (protected)
- Table view with all bookings
- Status badges (pending/approved/rejected)
- Approve/Reject actions for pending bookings
- Real-time status updates

### Availability Management

- Route: `/dashboard/availability` (protected)
- Weekly calendar view
- Toggle available/unavailable slots
- Visual indicators for availability status

### Settings

- Route: `/dashboard/settings` (protected)
- Business name configuration
- Notification email setup
- Save functionality (can be extended to persist in Supabase)

## Screenshots

Screenshots will be added to `docs/screenshots/` directory.

## Roadmap

- [ ] Real-time booking updates with Supabase subscriptions
- [ ] Email notifications for booking status changes
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Advanced availability rules (recurring patterns, holidays)
- [ ] Booking reminders and confirmations
- [ ] Client portal for viewing booking status
- [ ] Export functionality (CSV, PDF)
- [ ] Mobile app support
- [ ] Multi-language support
- [ ] Analytics and reporting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/your-username/flowdesk/issues) page.

---

Built with ❤️ using Next.js and Supabase
