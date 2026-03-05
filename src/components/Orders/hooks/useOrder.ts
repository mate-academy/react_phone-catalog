import { useQuery } from '@tanstack/react-query';
import { getOrder } from '@/services/paymentAPI';

export const useOrder = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId!),
    enabled: !!orderId,
  });
};
