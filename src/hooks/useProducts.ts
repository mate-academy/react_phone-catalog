import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectAllProducts } from '@store/selectors';

import * as Sort from '@utils/helpers/sortByOptions';

import { useAppSelector } from './typedHooks';

export const useProducts = () => {
  const { products, loading, error } = useAppSelector(state => state.products);
  const productsWithDetails = useSelector(selectAllProducts);

  const expensiveProduct = useMemo(
    () => Sort.getMostExpensiveProduct(products),
    [products],
  );

  const productWithDiscount = useMemo(
    () => Sort.getProductWithLargestDiscount(products),
    [products],
  );

  const newModels = useMemo(
    () => Sort.getProductsSortedByYearAndStorage(products),
    [products],
  );

  const randomProducts = useMemo(
    () => [...products].sort(() => Math.random() - 0.5),
    [products],
  );

  const filteredByQuery = useMemo(
    () => (query: string) => {
      return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
    },
    [products],
  );

  const validateProduct = (itemId: string | undefined) =>
    productsWithDetails.some(item => item.id === itemId);

  const selectProductWithDetails = (itemId: string | undefined) =>
    productsWithDetails.find(item => item.id === itemId);

  const selectProduct = (itemId: string | undefined) =>
    products.find(product => product.itemId === itemId);

  return {
    products,
    loading,
    error,
    newModels,
    expensiveProduct,
    productWithDiscount,
    productsWithDetails,
    randomProducts,
    filteredByQuery,
    selectProduct,
    selectProductWithDetails,
    validateProduct,
  };
};
