// backend/src/models/Transaction.ts
export interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: string;
  timestamp: Date;
}
