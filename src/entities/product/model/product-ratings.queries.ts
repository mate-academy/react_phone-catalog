import { useQuery } from '@tanstack/react-query';
import { productRatingsApi } from '../api/product-ratings.api';

export const useProductRatings = () => {
  return useQuery({
    queryKey: ['product-ratings'],
    queryFn: productRatingsApi.getAll,
    staleTime: 60_000,
  });
};

export const useProductRating = (namespaceId: string) => {
  return useQuery({
    queryKey: ['product-ratings', namespaceId],
    queryFn: () => productRatingsApi.getByNamespace(namespaceId),
    enabled: Boolean(namespaceId),
    staleTime: 60_000,
  });
};
