import { Router } from 'express';
import { transactionService } from '../services/transaction-service';

const router = Router();

router.get('/', (_, res) => {
  const flaggedTransactions = transactionService.getFlagged();
  const sortedTransactions = flaggedTransactions.sort((a, b) => b.updatedAt - a.updatedAt);

  res.status(200).json({
    status: 200,
    message: 'Transactions fetched successfully',
    data: sortedTransactions,
  });
});

router.post('/:id/flag', (req, res) => {
  const result = transactionService.updateStatus(parseInt(req.params.id), 'flagged');
  res.status(result.status).json(result);
});

router.post('/:id/allow', (req, res) => {
  const result = transactionService.updateStatus(parseInt(req.params.id), 'allowed');
  res.status(result.status).json(result);
});

router.post('/:id/comment', (req, res) => {
  const result = transactionService.createComment(parseInt(req.params.id), req.body.comment);
  res.status(result.status).json(result);
});

export default router;
