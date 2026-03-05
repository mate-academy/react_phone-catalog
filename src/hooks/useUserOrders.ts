import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '@/services/paymentAPI';

export const useUserOrders = () => {
  return useQuery({
    queryKey: ['orders', 'user'],
    queryFn: getUserOrders,
  });
};
