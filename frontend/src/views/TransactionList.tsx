'use client';

import { useRouter } from 'next/navigation';

import { Spinner } from '@/components/blocks/Spinner';

import { TransactionCard } from '@/components/TransactionCard';

import { useTransactions } from '@/hooks/useTransactions';
import { useUpdateTransaction } from '@/hooks/useUpdateTransaction';

export function TransactionList() {
  const router = useRouter();

  const { data, isLoading } = useTransactions();
  const { mutate: flagTransaction } = useUpdateTransaction('flag');
  const { mutate: allowTransaction } = useUpdateTransaction('allow');

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-screen">
        <Spinner />
        <div className="font-medium text-lg">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full p-6 sm:px-8 sm:py-6 mx-auto sm:max-w-xl min-h-dvh">
      {data?.data?.map(transaction => (
        <TransactionCard
          key={`transaction-${transaction.id}`}
          {...transaction}
          onView={() => router.push(`/details/${transaction.id}`)}
          onApprove={() => allowTransaction({ id: transaction.id })}
          onFlag={() => flagTransaction({ id: transaction.id })}
        />
      ))}
    </div>
  );
}
