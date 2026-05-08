// frontend/src/lib/freighter.ts
import {
  isConnected,
  isAllowed,
  setAllowed,
  getAddress,
  signTransaction,
  signAuthEntry,
} from "@stellar/freighter-api";

export const connectFreighter = async (): Promise<string> => {
  if (!(await isConnected())) {
    throw new Error("Freighter not installed");
  }
  
  if (!(await isAllowed())) {
    await setAllowed();
  }
  
  const { address } = await getAddress();
  return address;
};

export const signAuthEntryWrapper = async (
  authEntryXdr: string,
  networkPassphrase: string
): Promise<string> => {
  const { signedAuthEntry } = await signAuthEntry(authEntryXdr, {
    networkPassphrase,
  });
  return signedAuthEntry ?? "";
};
