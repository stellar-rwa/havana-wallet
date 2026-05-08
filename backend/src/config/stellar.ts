import { Networks } from '@stellar/stellar-sdk';
import { env } from './env';

export const stellarConfig = {
  networkPassphrase: env.STELLAR_NETWORK === 'PUBLIC' 
    ? Networks.PUBLIC 
    : Networks.TESTNET,
  rpcUrl: env.SOROBAN_RPC_URL,
  horizonUrl: env.HORIZON_URL,
  contracts: {
    identity: process.env.CONTRACT_ID_IDENTITY || '',
    aidVault: process.env.CONTRACT_ID_VAULT || '',
    payroll: process.env.CONTRACT_ID_PAYROLL || '',
    payment: process.env.CONTRACT_ID_PAYMENT || '',
  }
};
