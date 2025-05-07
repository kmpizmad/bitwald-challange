export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};

export type TransactionStatus = 'allowed' | 'flagged';

export type TransactionComment = {
  id: number;
  comment: string;
  createdAt: number;
  updatedAt: number;
};

export type Transaction<Comment extends number | TransactionComment = TransactionComment> = {
  id: number;
  status: TransactionStatus;
  amount: number;
  currency: string;
  description: string;
  comments: Comment[];
  createdAt: number;
  updatedAt: number;
};
