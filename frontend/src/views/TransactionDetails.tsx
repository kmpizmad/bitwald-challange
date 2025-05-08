'use client';

import { useMemo } from 'react';
import { ArrowLeftIcon } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { useTransactions } from '@/hooks/useTransactions';
import { useUpdateTransaction } from '@/hooks/useUpdateTransaction';

import { DataField } from '@/components/blocks/DataField';
import { Spinner } from '@/components/blocks/Spinner';

import { CommentSection } from '@/components/CommentSection';

import { createTransactionId } from '@/lib/utils';

export function TransactionDetails({ id }: { id: number }) {
  const router = useRouter();
  const { data, isLoading } = useTransactions();
  const { mutate: addComment } = useUpdateTransaction('comment');

  const trx = useMemo(() => data?.data?.find(trx => trx.id === id), [data, id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-screen">
        <Spinner />
        <div className="font-medium text-lg">Loading {createTransactionId(id)}...</div>
      </div>
    );
  }

  if (!trx) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl font-bold">404</div>
        <div className="text-lg">Transaction not found</div>
        <Button variant="default" className="mt-6" onClick={() => router.back()}>
          <ArrowLeftIcon className="w-4 h-4" />
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-6 sm:px-8 sm:py-6 mx-auto sm:max-w-xl min-h-dvh">
      <div>
        <Button variant="link" className="mb-6" onClick={() => router.back()}>
          <ArrowLeftIcon className="w-4 h-4" />
          Go back
        </Button>
      </div>
      <div className="flex flex-col justify-center flex-1 gap-4">
        <h1 className="text-2xl font-bold text-center mb-4">Details for {createTransactionId(trx.id)}</h1>
        <div>
          <DataField label="id" value={trx.id.toString()} />
          <DataField label="amount" value={`${trx.amount} ${trx.currency}`} />
          <DataField label="description" value={trx.description} />
        </div>
        <CommentSection comments={trx.comments} onComment={comment => addComment({ id, comment })} />
      </div>
    </div>
  );
}
