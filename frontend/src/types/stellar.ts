// frontend/src/types/stellar.ts
export interface StellarNetwork {
  network: string;
  networkPassphrase: string;
  horizonUrl: string;
  rpcUrl: string;
}

export interface StellarAccount {
  address: string;
  balances: {
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
    balance: string;
  }[];
}
