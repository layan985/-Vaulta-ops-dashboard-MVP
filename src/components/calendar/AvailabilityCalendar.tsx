'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './AvailabilityCalendar.module.css';

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}

const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

function getWeekDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
}

function getDayName(date: string): string {
  const d = new Date(date);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[d.getDay()];
}

function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function AvailabilityCalendar() {
  const [weekDates] = useState<string[]>(getWeekDates());
  const [availability, setAvailability] = useState<Record<string, Record<string, boolean>>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Initialize all slots as available
    const initial: Record<string, Record<string, boolean>> = {};
    weekDates.forEach((date) => {
      initial[date] = {};
      TIME_SLOTS.forEach((time) => {
        initial[date][time] = true;
      });
    });
    setAvailability(initial);
  }, [weekDates]);

  function toggleSlot(date: string, time: string) {
    setAvailability((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [time]: !prev[date]?.[time],
      },
    }));
  }

  async function handleSave() {
    setSaving(true);
    // In a real app, this would save to Supabase
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    alert('Availability saved successfully!');
  }

  return (
    <Card>
      <div className={styles.header}>
        <h2 className={styles.title}>Weekly Availability</h2>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      <div className={styles.calendar}>
        <div className={styles.timeColumn}>
          <div className={styles.timeHeader}></div>
          {TIME_SLOTS.map((time) => (
            <div key={time} className={styles.timeLabel}>
              {time}
            </div>
          ))}
        </div>
        
        <div className={styles.daysContainer}>
          {weekDates.map((date) => (
            <div key={date} className={styles.dayColumn}>
              <div className={styles.dayHeader}>
                <div className={styles.dayName}>{getDayName(date)}</div>
                <div className={styles.dayDate}>{formatDate(date)}</div>
              </div>
              {TIME_SLOTS.map((time) => (
                <button
                  key={`${date}-${time}`}
                  className={`${styles.slot} ${
                    availability[date]?.[time] ? styles.available : styles.unavailable
                  }`}
                  onClick={() => toggleSlot(date, time)}
                  type="button"
                >
                  {availability[date]?.[time] ? '✓' : '✗'}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.available}`}></div>
          <span>Available</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.unavailable}`}></div>
          <span>Unavailable</span>
        </div>
      </div>
    </Card>
  );
}
