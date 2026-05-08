// frontend/src/store/identityStore.ts
import { create } from 'zustand';

interface IdentityState {
  isVerified: boolean;
  tier: number;
  setIdentity: (verified: boolean, tier: number) => void;
}

export const useIdentityStore = create<IdentityState>((set) => ({
  isVerified: false,
  tier: 1,
  setIdentity: (verified, tier) => set({ isVerified: verified, tier }),
}));
