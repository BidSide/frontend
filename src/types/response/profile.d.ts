export interface Profile {
  firstName: string;
  lastName: string;
  info: {
    _id: string;
    wallet: number;
  };
  transactionLogs: TransactionLog[];
}

export interface TransactionLog {
  _id: string;
  amount: number;
  reason: string;
  createdAt: string;
  updatedAt: string;
}
