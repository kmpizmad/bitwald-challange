import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResponse, Transaction } from 'shared/api-types';

export function useUpdateTransaction(endpoint: 'flag' | 'allow' | 'comment') {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Transaction>, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      const res = await fetch(`http://localhost:8080/api/transactions/${id}/${endpoint}`, { method: 'POST' });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
