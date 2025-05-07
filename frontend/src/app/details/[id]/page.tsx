import { TransactionDetails } from '@/views/TransactionDetails';

export default function TransactionDetailsPage({ params }: { params: { id: string } }) {
  return <TransactionDetails id={Number(params.id)} />;
}
