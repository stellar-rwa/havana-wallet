// frontend/src/hooks/useStellarWallet.ts
import { useState } from 'react';
import { connectFreighter } from '@/lib/freighter';

export const useStellarWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    setLoading(true);
    try {
      const addr = await connectFreighter();
      setAddress(addr);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { address, connect, loading };
};
