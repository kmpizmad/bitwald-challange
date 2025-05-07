import { ApiResponse, Transaction, TransactionStatus } from 'shared/api-types';

import transactions from '../../data/transactions.json';
import { Database } from '../interfaces/data';

import { extractComments } from '../utils/comments';
import { saveDatabase } from '../utils/database';

const database = transactions as unknown as Database;

export const transactionService = {
  getFlagged: getFlaggedTransactions,
  updateStatus: updateTransactionStatus,
  createComment: createTransactionComment,
};

/**
 * Get all flagged transactions with their comments
 * @returns Transaction array with comments
 */
function getFlaggedTransactions(): Transaction[] {
  const transactions = database.transactions.rows;

  const flaggedTransactions = transactions.filter(transaction => transaction.status === 'flagged');
  const mappedTransactions = flaggedTransactions.map(transaction => extractComments(transaction));

  return mappedTransactions;
}

/**
 * Update the status of a transaction
 * @param id - The id of the transaction
 * @param status - The new status of the transaction
 * @returns ApiResponse of Transaction
 */
function updateTransactionStatus(id: number, status: TransactionStatus): ApiResponse<Transaction<number>> {
  if (isNaN(id)) {
    return {
      status: 400,
      message: "Invalid parameter 'id'",
      data: null,
    };
  }

  const transactions = database.transactions.rows;
  const transaction = transactions.find(t => t.id === id);
  if (!transaction) {
    return {
      status: 404,
      message: 'Transaction not found',
      data: null,
    };
  }

  transaction.status = status;
  transaction.updatedAt = Date.now();

  database.transactions.rows[id - 1] = transaction;
  saveDatabase(database);

  return {
    status: 200,
    message: `Transaction status changed to '${status}' successfully`,
    data: transaction,
  };
}

/**
 * Create a comment for a transaction
 * @param id - The id of the transaction
 * @param comment - The comment to create
 * @returns ApiResponse<Transaction>
 */
function createTransactionComment(id: number, comment: string) {
  if (isNaN(id)) {
    return {
      status: 400,
      message: "Invalid parameter 'id'",
      data: null,
    };
  }

  const transactions = database.transactions.rows;
  const transaction = transactions.find(t => t.id === id);
  if (!transaction) {
    return {
      status: 404,
      message: 'Transaction not found',
      data: null,
    };
  }

  if (!comment) {
    return {
      status: 400,
      message: "Invalid or missing parameter 'comment'",
      data: null,
    };
  }

  const now = Date.now();

  database.comments._meta.lastIndex++;
  const commentId = database.comments._meta.lastIndex;

  database.comments.rows.push({
    id: commentId,
    comment,
    createdAt: now,
    updatedAt: now,
  });

  transaction.comments.push(commentId);
  saveDatabase(database);

  return {
    status: 200,
    message: 'Comment added successfully',
    data: transaction,
  };
}
