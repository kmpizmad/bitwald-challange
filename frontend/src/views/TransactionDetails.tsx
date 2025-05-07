'use client';

import { useMemo, useRef } from 'react';

import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { useTransactions } from '@/hooks/useTransactions';
import { useUpdateTransaction } from '@/hooks/useUpdateTransaction';

export function TransactionDetails({ id }: { id: number }) {
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { data } = useTransactions();
  const { mutate: addComment } = useUpdateTransaction('comment');

  const trx = useMemo(() => data?.data.find(trx => trx.id === id), [data, id]);

  if (!trx) {
    return <div>Transaction not found</div>;
  }

  return (
    <div className="px-8 py-6 mx-auto space-y-1 max-w-7xl">
      <div>
        <div className="flex items-center gap-2">
          <div className="font-bold">ID:</div>
          <div>{trx.id}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold">AMOUNT:</div>
          <div>
            {trx.amount} {trx.currency}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold">DESCRIPTION:</div>
          <div>{trx.description}</div>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <div className="font-bold">COMMENTS</div>
        <div className="space-y-2">
          {trx.comments.map(comment => (
            <div key={`comment-${comment.id}`} className="px-6 py-4 border border-gray-200 rounded-md">
              <div className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
              <div>{comment.comment}</div>
            </div>
          ))}
          <Separator className="mt-6 mb-4" />
          <div className="space-y-3">
            <Textarea ref={commentRef} className="w-full" placeholder="Type your comment here..." />
            <Button
              variant="default"
              onClick={() => {
                if (!commentRef.current) return;
                addComment({ id, comment: commentRef.current.value });
                commentRef.current.value = '';
              }}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
