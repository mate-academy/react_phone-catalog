// import { useQuery } from '@tanstack/react-query';
// import { fetchProductByItemId } from '@/api/productById';

// export const useProductDetails = (itemId: string, category: string) => {
//   return useQuery({
//     queryKey: ['productDetails', itemId, category],
//     queryFn: () => fetchProductByItemId(itemId, category),
//     enabled: !!itemId && !!category,
//   });
// };
import {
  usePhoneDetails,
  useTabletDetails,
  useAccessoriesDetails,
} from './useCategoryDetails';

type Category = 'phones' | 'tablets' | 'accessories';

export const useProductDetails = (itemId: string, category: string) => {
  const phones = usePhoneDetails();
  const tablets = useTabletDetails();
  const accessories = useAccessoriesDetails();

  const detailsMap = {
    phones,
    tablets,
    accessories,
  };

  const { data = [], isLoading } = detailsMap[category as Category] ?? phones;

  return {
    data: data.find(p => p.id === itemId),
    isLoading,
  };
};
