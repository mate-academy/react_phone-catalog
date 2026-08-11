import { fetchProducts } from './fetchProducts';
import { Product } from '../types/product';

export const getRandomProducts = (
  currentProductID: string,
  count = 10,
): Product[] => {
  const allProducts = fetchProducts();
  const filtered = allProducts.filter(p => p.itemId !== currentProductID);
  const randomProducts = filtered.sort(() => 0.5 - Math.random());

  return randomProducts.slice(0, count);
};
