import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../hooks';
import { fetchProducts } from '../utils/fetchProducts';

import { Product } from '../types/Product';
import { Category } from '../types/CategoryTypes';
import { SortOption } from '../types/DropDownSortOptions';

type UseProductsReturn = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

export const useProducts = (
  category: Category,
  sortBy: SortOption,
  productsUrl?: string,
): UseProductsReturn => {
  const { favoriteItems } = useAppSelector((state) => state.favorites);

  // Function to sort products based on the selected option
  const sortProducts = (productsToSort: Product[]): Product[] => {
    switch (sortBy) {
      case 'Newest':
        return [...productsToSort].sort((a, b) => b.year - a.year);
      case 'Alphabetically':
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'Cheapest':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      default:
        return productsToSort;
    }
  };

  // Using React Query to fetch and manage products data
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', category, productsUrl],
    queryFn: async () => {
      if (!productsUrl) return [];

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fetchedProducts: Product[] = await fetchProducts(productsUrl);

      return fetchedProducts.filter((product) => product.category === category);
    },
    enabled: !!productsUrl && category !== 'favourites',
    refetchOnMount: 'always', // Always refetch on mount
    refetchInterval: 0, // Disable automatic refetching
  });

  console.log('Data', products);
  console.log('Error', isError);

  // Sorting products based on the selected option
  const sortedProducts = sortProducts(
    category === 'favourites' ? favoriteItems : products,
  );

  return { products: sortedProducts, isLoading, isError };
};
