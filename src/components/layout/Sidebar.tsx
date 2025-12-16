'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/bookings', label: 'Bookings' },
  { href: '/dashboard/availability', label: 'Availability' },
  { href: '/dashboard/settings', label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Flowdesk</h1>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(styles.navItem, isActive && styles.active)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

