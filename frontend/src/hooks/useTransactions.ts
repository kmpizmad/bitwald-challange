'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiResponse, Transaction } from 'shared/api-types';

export function useTransactions() {
  return useQuery<ApiResponse<Transaction[]>>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/api/transactions', { method: 'GET' });
      const data = await res.json();
      return data;
    },
  });
}
