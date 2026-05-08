// frontend/src/hooks/useBalance.ts
import { useQuery } from '@tanstack/react-query';
import { getAccountBalance } from '@/lib/stellar';

export const useBalance = (address: string, assetCode: string, assetIssuer: string) => {
  return useQuery({
    queryKey: ['balance', address, assetCode],
    queryFn: () => getAccountBalance(address, assetCode, assetIssuer),
    enabled: !!address,
  });
};
