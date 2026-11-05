import { useQuery } from '@tanstack/react-query';
import { getUsdToUahRate } from '@/shared/api/currency';

export const useUsdToUahRate = () => {
  return useQuery({
    queryKey: ['exchangeRate', 'USD', 'UAH'],
    queryFn: getUsdToUahRate,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });
};
