// frontend/src/providers/StellarProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ACTIVE_NETWORK } from '@/lib/stellar';

interface StellarContextType {
  network: typeof ACTIVE_NETWORK;
  isReady: boolean;
}

const StellarContext = createContext<StellarContextType | undefined>(undefined);

export const StellarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <StellarContext.Provider value={{ network: ACTIVE_NETWORK, isReady }}>
      {children}
    </StellarContext.Provider>
  );
};

export const useStellar = () => {
  const context = useContext(StellarContext);
  if (!context) throw new Error('useStellar must be used within StellarProvider');
  return context;
};
