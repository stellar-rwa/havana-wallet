// frontend/src/lib/stellar.ts
import {
  Horizon,
  Soroban,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Contract,
  nativeToScVal,
  Address,
  xdr,
  rpc,
} from "@stellar/stellar-sdk";

export const STELLAR_NETWORK = {
  TESTNET: {
    networkPassphrase: Networks.TESTNET,
    horizonUrl: "https://horizon-testnet.stellar.org",
    rpcUrl: "https://soroban-testnet.stellar.org",
    networkName: "TESTNET",
  },
};

export const ACTIVE_NETWORK = STELLAR_NETWORK.TESTNET;

export const horizonServer = new Horizon.Server(ACTIVE_NETWORK.horizonUrl);
export const rpcServer = new rpc.Server(ACTIVE_NETWORK.rpcUrl);

export const formatAddress = (address: string): string =>
  address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";

export const formatUsdc = (stroops: string | number): string => {
  const amount = Number(stroops) / 10_000_000;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getAccountBalance = async (
  address: string,
  assetCode: string,
  assetIssuer: string
): Promise<string> => {
  const account = await horizonServer.loadAccount(address);
  const balance = account.balances.find(
    (b: any) =>
      b.asset_type !== "native" &&
      b.asset_code === assetCode &&
      b.asset_issuer === assetIssuer
  );
  return balance?.balance || "0";
};
