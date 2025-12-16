import { cn } from '@/lib/utils/cn';
import styles from './Table.module.css';
import { HTMLAttributes, ReactNode } from 'react';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={cn(styles.table, className)} {...props}>
        {children}
      </table>
    </div>
  );
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHead({ className, children, ...props }: TableHeadProps) {
  return (
    <thead className={cn(styles.thead, className)} {...props}>
      {children}
    </thead>
  );
}

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn(styles.tbody, className)} {...props}>
      {children}
    </tbody>
  );
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export function TableRow({ className, children, ...props }: TableRowProps) {
  return (
    <tr className={cn(styles.tr, className)} {...props}>
      {children}
    </tr>
  );
}

interface TableHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export function TableHeader({
  className,
  children,
  ...props
}: TableHeaderProps) {
  return (
    <th className={cn(styles.th, className)} {...props}>
      {children}
    </th>
  );
}

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <td className={cn(styles.td, className)} {...props}>
      {children}
    </td>
  );
}

