import { useCallback } from 'react';
import { Product } from '../types/product';

export const useFilteredProducts = (
  initialProducts: Product[],
  searchBar: string,
) => {
  const getFilteredProducts = useCallback(() => {
    return initialProducts.filter((prod) => {
      const preparedProdName = prod.name.toLowerCase().replace(/\s/g, '');
      const preparedSearchBar = searchBar.toLowerCase().split(' ');

      return preparedSearchBar
        .every((keyword) => preparedProdName
          .includes(keyword));
    });
  }, [searchBar, initialProducts]);

  return getFilteredProducts();
};
