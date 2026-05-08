import { useQuery } from '@tanstack/react-query';

export const useTransactions = (address: string | null) => {
  return useQuery({
    queryKey: ['transactions', address],
    queryFn: async () => {
      // Logic to fetch transactions from Horizon
      return [];
    },
    enabled: !!address,
  });
};
