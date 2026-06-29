import { useProducts } from './useProducts';
import { getProductsByCategory } from '../utils/getProductsByCategory';
import { Category } from '../types/ProductCategory';

export const useSuggestedProducts = (category: Category | undefined) => {
  const { productsList: products } = useProducts();

  if (!category) {
    return [];
  }

  const productsByCategory = getProductsByCategory(products, category);

  return [...productsByCategory].sort(() => Math.random() - 0.5);
};
