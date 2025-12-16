# Vaulta — Ops Dashboard

A polished, agency-grade internal operations dashboard built with Next.js, TypeScript, and Supabase. Perfect for managing KPIs, users, and activity logs.

## Features

- 🔐 **Authentication** - Secure email/password authentication with Supabase
- 📊 **Dashboard** - KPI overview with charts and recent activity
- 👥 **User Management** - User table with search and role badges
- 📝 **Activity Logs** - Timeline view with filtering capabilities
- ⚙️ **Settings** - Profile management and theme preferences
- 🎨 **Modern UI** - Clean, professional design with CSS Modules
- 🛡️ **Route Protection** - Protected dashboard routes with auth guards
- ⚡ **Performance** - Optimized with Next.js App Router and Suspense

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Styling**: CSS Modules
- **Charts**: Recharts
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/vaulta-ops-dashboard.git
cd vaulta-ops-dashboard
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

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

### Required Tables

The app will work without tables (showing empty states), but for full functionality, create these tables:

#### `profiles`
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `activity_logs`
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT,
  type TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `kpis_daily`
```sql
CREATE TABLE kpis_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE,
  new_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  revenue DECIMAL DEFAULT 0,
  tickets INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Project Structure

```
src/
  app/
    page.tsx                 # Public landing page
    layout.tsx               # Root layout
    globals.css              # Global styles
    (auth)/
      login/page.tsx         # Login page
      signup/page.tsx        # Signup page
    (dashboard)/
      layout.tsx             # Dashboard layout (protected)
      dashboard/page.tsx     # Dashboard overview
      users/page.tsx         # Users table
      activity/page.tsx      # Activity logs
      settings/page.tsx      # Settings
  components/
    layout/
      Sidebar.tsx            # Navigation sidebar
      Topbar.tsx             # Top navigation bar
    ui/
      Button.tsx             # Button component
      Input.tsx              # Input component
      Card.tsx               # Card component
      Badge.tsx              # Badge component
      Table.tsx               # Table components
      Skeleton.tsx            # Loading skeleton
    charts/
      KpiChart.tsx           # KPI chart component
    tables/
      UsersTable.tsx         # Users table component
  lib/
    supabase/
      client.ts              # Browser Supabase client
      server.ts              # Server Supabase client
    auth/
      actions.ts             # Auth server actions
      guards.ts              # Route protection guards
    data/
      users.ts               # User data helpers
      activity.ts            # Activity data helpers
      kpis.ts                # KPI data helpers
    utils/
      cn.ts                  # Class name utility
  styles/
    theme.ts                 # Theme constants
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

## Screenshots

Screenshots will be added to `docs/screenshots/` directory.

## Roadmap

- [ ] Real-time updates with Supabase subscriptions
- [ ] Advanced filtering and search
- [ ] Export functionality (CSV, PDF)
- [ ] Email notifications
- [ ] Role-based access control (RBAC)
- [ ] Dark mode theme
- [ ] Mobile responsive improvements
- [ ] Unit and integration tests
- [ ] API documentation

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/your-username/vaulta-ops-dashboard/issues) page.

---

Built with ❤️ using Next.js and Supabase
