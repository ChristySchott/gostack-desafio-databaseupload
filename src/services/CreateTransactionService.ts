import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_id: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category_id }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const balance = await transactionsRepository.getBalance()

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Type should be income or outcome.');
    }

    if (type === 'outcome' && value > balance.income) {
      throw new AppError('Insufficient funds.');
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id
    })

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
