import { Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/server';
import styles from './page.module.css';

async function ProfileCard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Card>
      <h2 className={styles.sectionTitle}>Profile</h2>
      <div className={styles.profileContent}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <p className={styles.value}>{user?.email || 'N/A'}</p>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Role</label>
          <p className={styles.value}>User</p>
        </div>
      </div>
    </Card>
  );
}

function ThemeToggle() {
  return (
    <Card>
      <h2 className={styles.sectionTitle}>Theme</h2>
      <div className={styles.themeContent}>
        <p className={styles.themeText}>Choose your preferred theme</p>
        <div className={styles.themeButtons}>
          <Button variant="primary" disabled>
            Light
          </Button>
          <Button variant="ghost" disabled>
            Dark
          </Button>
        </div>
        <p className={styles.themeNote}>Theme toggle coming soon</p>
      </div>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <Suspense fallback={<Skeleton height={200} />}>
        <ProfileCard />
      </Suspense>
      <ThemeToggle />
    </div>
  );
}

