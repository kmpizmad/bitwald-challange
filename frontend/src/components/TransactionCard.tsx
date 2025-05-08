'use client';

import { Transaction } from 'shared/api-types';

import { CheckIcon, EyeIcon, FlagIcon, MessageCircleIcon } from 'lucide-react';

import { createTransactionId } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export type TransactionCardProps = Transaction & {
  onView?: () => void;
  onApprove?: () => void;
  onFlag?: () => void;
};

export function TransactionCard({
  id,
  amount,
  currency,
  description,
  status,
  comments,
  createdAt,
  onView,
  onApprove,
  onFlag,
}: TransactionCardProps) {
  return (
    <Card className="gap-2 sm:gap-4">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Badge>{status}</Badge>
            <div className="flex items-center gap-1">
              <MessageCircleIcon className="w-4 h-4" /> {comments.length}
            </div>
          </div>
          <div className="text-sm text-gray-400 italic">{new Date(createdAt).toLocaleDateString()}</div>
        </div>
        <CardTitle>{createTransactionId(id)}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {amount} {currency}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <Button variant="outline" size="icon" onClick={onView}>
            <EyeIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="destructive" size="icon" className="bg-rose-500 hover:bg-rose-600" onClick={onFlag}>
            <FlagIcon className="w-4 h-4" />
          </Button>
          <Button variant="default" size="icon" className="bg-emerald-500 hover:bg-emerald-600" onClick={onApprove}>
            <CheckIcon className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
