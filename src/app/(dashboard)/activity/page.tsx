'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

type Filter = 'all' | 'users' | 'system';

interface ActivityLog {
  id: string;
  action?: string;
  message?: string;
  type?: string;
  category?: string;
  created_at: string;
}

export default function ActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    async function fetchLogs() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          console.error('Error fetching activity logs:', error);
        } else {
          setLogs((data as ActivityLog[]) || []);
        }
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    if (filter === 'users') return log.type === 'user' || log.category === 'user';
    if (filter === 'system') return log.type === 'system' || log.category === 'system';
    return true;
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Activity</h1>
        <Skeleton height={400} />
      </div>
    );
  }

  if (filteredLogs.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Activity</h1>
        <Card>
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>No activity logs found</h2>
            <p className={styles.emptyText}>
              Activity logs will appear here once they are created.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Activity</h1>
        <div className={styles.filters}>
          <Button
            variant={filter === 'all' ? 'primary' : 'ghost'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'users' ? 'primary' : 'ghost'}
            onClick={() => setFilter('users')}
          >
            Users
          </Button>
          <Button
            variant={filter === 'system' ? 'primary' : 'ghost'}
            onClick={() => setFilter('system')}
          >
            System
          </Button>
        </div>
      </div>
      <Card>
        <div className={styles.timeline}>
          {filteredLogs.map((log) => (
            <div key={log.id} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <p className={styles.timelineText}>{log.action || log.message || 'Activity'}</p>
                <p className={styles.timelineTime}>
                  {new Date(log.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

