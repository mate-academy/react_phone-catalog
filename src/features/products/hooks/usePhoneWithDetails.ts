import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/api/products';
import { fetchPhoneDetails } from '@/api/phoneDetails';

export const useProductsWithDetails = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const { data: details = [] } = useQuery({
    queryKey: ['productDetails'],
    queryFn: fetchPhoneDetails,
  });

  return products.map(product => {
    const matched = details.find(d => d.id === product.itemId);

    return {
      ...product,
      priceRegular: matched?.priceRegular,
      priceDiscount: matched?.priceDiscount,
    };
  });
};
