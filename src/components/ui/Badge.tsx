import { cn } from '@/lib/utils/cn';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  children,
  className,
}: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}

