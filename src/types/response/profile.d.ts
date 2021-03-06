export interface Profile {
  firstName: string;
  lastName: string;
  info: {
    _id: string;
    subscriptions: string[];
    user: string;
    wallet: number;
  };
  transactionLogs: TransactionLog[];
  subscribers: number;
}

export interface PublicProfileInterface {
  _id: string;
  subscriptions: string[];
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface TransactionLog {
  _id: string;
  amount: number;
  reason: string;
  createdAt: string;
  updatedAt: string;
}
