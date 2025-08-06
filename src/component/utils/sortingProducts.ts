import { Products } from '../../types/Products';
import { getData } from './httpClient';

export const getAllProducts = () => getData<Products[]>('/products.json');

export const getProductsByCategory = async (category: string) => {
  const products = await getAllProducts();

  return products.filter(product => product.category === category);
};

export const getNewProduct = async () => {
  const products = await getAllProducts();
  const latestYear = Math.max(...products.map(product => product.year));

  return products
    .filter(product => product.year === latestYear)
    .sort((a, b) => b.fullPrice - a.fullPrice);
};

export const getHotPriceProducts = async () => {
  const products = await getAllProducts();

  return products.sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
};
