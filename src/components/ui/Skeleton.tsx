import { cn } from '@/lib/utils/cn';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, className)}
      style={{ width, height }}
    />
  );
}

