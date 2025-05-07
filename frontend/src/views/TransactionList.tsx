'use client';

import { useRouter } from 'next/navigation';
import { CheckIcon, FlagIcon, EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { useTransactions } from '@/hooks/useTransactions';
import { useUpdateTransaction } from '@/hooks/useUpdateTransaction';

export function TransactionList() {
  const router = useRouter();

  const { data, isLoading } = useTransactions();
  const { mutate: flagTransaction } = useUpdateTransaction('flag');
  const { mutate: allowTransaction } = useUpdateTransaction('allow');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-7 px-3 py-2 text-2xl font-bold border-b border-gray-200 place-items-center">
        <div>TIMESTAMP</div>
        <div>TRX ID</div>
        <div>AMOUNT</div>
        <div>DESCRIPTION</div>
        <div>COMMENTS</div>
        <div>STATUS</div>
        <div>ACTIONS</div>
      </div>
      {data?.data?.map(trx => {
        return (
          <div
            key={`transaction-${trx.id}`}
            className="grid grid-cols-7 px-3 py-2 border-b border-gray-200 place-items-center"
          >
            <div>{new Date(trx.createdAt).toLocaleString()}</div>
            <div>TRX-{trx.id.toString().padStart(4, '0')}</div>
            <div>
              {trx.amount} {trx.currency}
            </div>
            <div className="w-full truncate">{trx.description}</div>
            <div>{trx.comments.length}</div>
            <div>
              <Badge
                variant="outline"
                className={cn('text-gray-900 border-0', `${trx.status === 'approved' ? 'bg-green-300' : 'bg-red-300'}`)}
              >
                {trx.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => router.push(`/details/${trx.id}`)}>
                <EyeIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="bg-green-600 hover:bg-emerald-700"
                onClick={() => allowTransaction({ id: trx.id })}
              >
                <CheckIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="bg-rose-600 hover:bg-red-700"
                onClick={() => flagTransaction({ id: trx.id })}
              >
                <FlagIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
