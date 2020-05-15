export interface Profile {
  firstName: string;
  lastName: string;
  info: {
    _id: string;
    wallet: number;
    user: string;
    subscriptions: string[];
  };
  transactionLogs: TransactionLog[];
}

export interface PublicProfileInterface {
  firstName: string;
  lastName: string;
}

export interface TransactionLog {
  _id: string;
  amount: number;
  reason: string;
  createdAt: string;
  updatedAt: string;
}
