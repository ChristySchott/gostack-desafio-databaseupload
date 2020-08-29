import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Type should be income or outcome.');
    }

    // if (type === 'outcome' && value > total) {
    // throw new AppError('Insufficient funds.');
    // }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
    })

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
