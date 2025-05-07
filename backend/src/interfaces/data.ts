import { Transaction, TransactionComment } from 'shared/api-types';

export type Database = {
  transactions: {
    _meta: {
      lastIndex: number;
    };
    rows: Transaction<number>[];
  };
  comments: {
    _meta: {
      lastIndex: number;
    };
    rows: TransactionComment[];
  };
};
