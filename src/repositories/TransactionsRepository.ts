import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let incomeSum = 0;
    let outcomeSum = 0;
    this.transactions.forEach(item => {
      if (item.type === 'income') {
        incomeSum += item.value;
      }
    });
    this.transactions.forEach(item => {
      if (item.type === 'outcome') {
        outcomeSum += item.value;
      }
    });
    const newBalance: Balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };
    return newBalance;
  }

  public create({ title, type, value }: createTransactionDTO): Transaction {
    if (type === 'outcome') {
      const balance = this.getBalance();
      if (balance.total < value) {
        throw new Error('You dont have balance');
      }
    }
    const transaction = new Transaction({ type, value, title });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
