import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const income = (await this.find()).reduce((total, current) => {
      if (current.type === 'income') {
        return total + current.value;
      }
      return total;
    }, 0);

    const outcome = (await this.find()).reduce((total, current) => {
      if (current.type === 'outcome') {
        return total + current.value;
      }
      return total;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    }

    return balance;
  }
}

export default TransactionsRepository;
