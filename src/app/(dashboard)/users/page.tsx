import { Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { UsersTable } from '@/components/tables/UsersTable';
import { getUsers } from '@/lib/data/users';
import { SeedButton } from './SeedButton';
import styles from './page.module.css';

async function UsersContent() {
  const users = await getUsers();

  if (users.length === 0) {
    return (
      <Card>
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No users found</h2>
          <p className={styles.emptyText}>
            Get started by creating your first user or seeding demo data.
          </p>
          <SeedButton />
        </div>
      </Card>
    );
  }

  return <UsersTable users={users} />;
}

export default function UsersPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users</h1>
      </div>
      <Suspense fallback={<Skeleton height={400} />}>
        <UsersContent />
      </Suspense>
    </div>
  );
}

