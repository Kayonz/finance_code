import auth from './auth.js';
import balance from './balance.js';
import category from './category.js';
import expense from './expense.js';
import finance from './finance.js';
import groupedExpense from './grouped-expense.js';
import metric from './metric.js';
import ocr from './ocr.js';

const routes = (app) => {
  app.use('/auth', auth);

  app.use('/balance', balance);

  app.use('/category', category);

  app.use('/expense', expense);

  app.use('/finance', finance);

  app.use('/grouped-expense', groupedExpense);

  app.use('/metric', metric);

  app.use('/ocr', ocr);
};

export default routes;