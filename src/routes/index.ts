import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import categorysRouter from './categorys.routes';

const routes = Router();

routes.use('/categorys', categorysRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
