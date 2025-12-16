'use client';

import { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import styles from './UsersTable.module.css';

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [search, setSearch] = useState('');
  
  const filteredUsers = initialUsers.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleVariant = (role: string): 'default' | 'success' | 'warning' | 'danger' => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'user':
        return 'default';
      case 'moderator':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Input
          type="search"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Created</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleVariant(user.role)}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

