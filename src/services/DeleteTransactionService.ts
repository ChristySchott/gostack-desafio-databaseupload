import { getCustomRepository, DeleteResult } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const deleteTransaction = await transactionsRepository.delete(id)

    if (!(await deleteTransaction).affected) {
      throw new AppError('Transaction not deleted, ID not found.');
    }

    return deleteTransaction;
  }
}

export default DeleteTransactionService;
