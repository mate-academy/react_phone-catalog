import { useQuery } from '@tanstack/react-query';
import { fetchProductByItemId } from '@/api/productById';

export const useProductDetails = (itemId: string, category: string) => {
  return useQuery({
    queryKey: ['productDetails', itemId, category],
    queryFn: () => fetchProductByItemId(itemId, category),
    enabled: !!itemId && !!category,
  });
};
