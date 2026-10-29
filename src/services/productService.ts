import type { Product } from '../types/Product';

const PRODUCTS_URL = '/api/products.json';

let cache: Promise<Product[]> | null = null;

export const getProducts = (): Promise<Product[]> => {
  if (!cache) {
    cache = fetch(PRODUCTS_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.status}`);
        }

        return response.json() as Promise<Product[]>;
      })
      .catch(error => {
        cache = null;

        throw error;
      });
  }

  return cache;
};

export const getProductsByCategory = async (
  category: Product['category'],
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getBrandNewPhones = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === 'phones').slice(0, 13);
};

export const getHotDiscounts = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = (a.fullPrice - a.price) / a.fullPrice;

      const discountB = (b.fullPrice - b.price) / b.fullPrice;

      return discountB - discountA;
    })
    .slice(0, 13);
};

export const getProductsCounts = async () => {
  const products = await getProducts();

  return {
    phonesCount: products.filter(product => product.category === 'phones')
      .length,
    tabletsCount: products.filter(product => product.category === 'tablets')
      .length,
    accessoriesCount: products.filter(
      product => product.category === 'accessories',
    ).length,
  };
};
