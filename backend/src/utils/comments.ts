import { Transaction } from 'shared/api-types';
import transactions from '../../data/transactions.json';
import { Database } from '../interfaces/data';

const database = transactions as unknown as Database;
const comments = database.comments.rows;

export function extractComments(transaction: Transaction<number>) {
  return {
    ...transaction,
    comments: comments
      .filter(comment => transaction.comments.includes(comment.id))
      .sort((a, b) => b.updatedAt - a.updatedAt),
  };
}
