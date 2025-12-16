import { Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { KpiChart } from '@/components/charts/KpiChart';
import { getKpis, getMockKpis } from '@/lib/data/kpis';
import { getActivityLogs } from '@/lib/data/activity';
import styles from './page.module.css';

async function KpiCards() {
  const kpis = await getKpis();
  const mockKpis = getMockKpis();
  const data = kpis.length > 0 ? kpis : mockKpis;

  const latest = data[0] || {
    new_users: 0,
    active_users: 0,
    revenue: 0,
    tickets: 0,
  };

  return (
    <div className={styles.kpiGrid}>
      <Card>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiLabel}>New Users</h3>
          <p className={styles.kpiValue}>{latest.new_users || 0}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiLabel}>Active Users</h3>
          <p className={styles.kpiValue}>{latest.active_users || 0}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiLabel}>Revenue</h3>
          <p className={styles.kpiValue}>${(latest.revenue || 0).toLocaleString()}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiLabel}>Tickets</h3>
          <p className={styles.kpiValue}>{latest.tickets || 0}</p>
        </div>
      </Card>
    </div>
  );
}

async function ChartSection() {
  const kpis = await getKpis();
  const mockKpis = getMockKpis();
  const data = kpis.length > 0 ? kpis : mockKpis;

  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.revenue || 0,
  }));

  return (
    <Card>
      <h2 className={styles.sectionTitle}>Revenue Trend</h2>
      <KpiChart data={chartData} />
    </Card>
  );
}

async function RecentActivity() {
  const logs = await getActivityLogs(5);

  if (logs.length === 0) {
    return (
      <Card>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.emptyState}>
          <p>No activity logs found.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className={styles.sectionTitle}>Recent Activity</h2>
      <div className={styles.activityList}>
        {logs.map((log: { id: string; action?: string; created_at: string }) => (
          <div key={log.id} className={styles.activityItem}>
            <div className={styles.activityContent}>
              <p className={styles.activityText}>{log.action || 'Activity'}</p>
              <p className={styles.activityTime}>
                {new Date(log.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <Suspense fallback={<Skeleton height={120} />}>
        <KpiCards />
      </Suspense>
      <Suspense fallback={<Skeleton height={400} />}>
        <ChartSection />
      </Suspense>
      <Suspense fallback={<Skeleton height={300} />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

