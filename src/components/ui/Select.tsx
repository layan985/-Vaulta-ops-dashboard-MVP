import { cn } from '@/lib/utils/cn';
import styles from './Select.module.css';
import { SelectHTMLAttributes } from 'react';

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(styles.select, className)} {...props}>
      {children}
    </select>
  );
}
