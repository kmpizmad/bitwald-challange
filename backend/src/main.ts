import express from 'express';
import parser from 'body-parser';

import transactionController from './controllers/transaction-controller';

const app = express();
const port = 8080;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/api/transactions', transactionController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
