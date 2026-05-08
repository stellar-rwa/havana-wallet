// backend/src/services/StellarService.ts
import { horizonServer } from '../utils/stellar';

export class StellarService {
  static async getTransactionHistory(_address: string) {
    return await horizonServer.transactions().forAccount(address).call();
  }

  static async submitTransaction(xdr: string) {
    return await horizonServer.submitTransaction(xdr as any);
  }
}
