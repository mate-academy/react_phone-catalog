import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export const getAllProducts = async () => {
  return getData('/api/products.json');
};

export const getProducts = async (category: string) => {
  const products = await getData<Product[]>('/api/products.json');

  // eslint-disable-next-line no-console
  console.log(products);

  return products.filter((product: Product) => product.category === category);
};

export const getHotPriceProducts = async () => {
  const response = await fetch('/api/products.json');
  const data = await response.json();

  return (
    data
      // .filter(
      //   (product: Product) => !product.name.startsWith('Apple iPhone 14 Pro '),
      // )
      .sort((a: Product, b: Product) => {
        return b.fullPrice - b.price - (a.fullPrice - a.price);
      })
  );
};

export const getNewProducts = async () => {
  const response = await fetch('/api/products.json');
  const data = await response.json();
  const latestYear = data.reduce(
    (acc: number, product: Product) => Math.max(acc, product.year),
    0,
  );

  return (
    data
      .filter((product: Product) => product.year === latestYear)
      // .filter(
      //   (product: Product) => !product.name.startsWith('Apple iPhone 14 Pro '),
      // )
      .sort((a: Product, b: Product) => b.fullPrice - a.fullPrice)
  );
};
