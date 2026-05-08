// backend/src/models/Disbursement.ts
export interface Disbursement {
  id: string;
  batchId: string;
  amount: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  recipients: string[];
}
