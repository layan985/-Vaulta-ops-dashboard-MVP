import { requireAuth } from '@/lib/auth/guards';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import styles from './layout.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Topbar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

