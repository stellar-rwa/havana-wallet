// backend/src/utils/stellar.ts
import { Horizon, rpc, Networks } from '@stellar/stellar-sdk';

export const STELLAR_NETWORK = Networks.TESTNET;

export const horizonServer = new Horizon.Server('https://horizon-testnet.stellar.org');
export const rpcServer = new rpc.Server('https://soroban-testnet.stellar.org');
