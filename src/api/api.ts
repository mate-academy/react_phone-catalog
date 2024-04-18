import { ProductDetails } from '../types/ProductDetails';
import { Product } from '../types/Product';

export const getAllProducts = (): Promise<Product[]> => {
  return fetch('/api/products.json').then(response => response.json());
};

export const getHotPrices: Promise<Product[]> = getAllProducts().then(
  products =>
    products
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
);

export const getBrandNew: Promise<Product[]> = getAllProducts().then(products =>
  products.sort((a, b) => b.fullPrice - a.fullPrice),
);

export const getPhones: Promise<Product[]> = getAllProducts().then(products => {
  return products.filter(product => product.category === 'phones');
});

export const getTablets: Promise<Product[]> = getAllProducts().then(
  products => {
    return products.filter(product => product.category === 'tablets');
  },
);

export const getAccessories: Promise<Product[]> = getAllProducts().then(
  products => {
    return products.filter(product => product.category === 'accessories');
  },
);

export async function findProductByItemId(itemId: string, category: string) {
  const url = `/api/${category}.json`;
  const response = await fetch(url);
  const products = await response.json();
  const foundProduct = products.find(
    (product: ProductDetails) => product.id === itemId,
  );

  return foundProduct;
}

export const getSuggestedProducts = (itemPrice: number) => {
  const similarProducts = getAllProducts().then(products => {
    return products.filter(
      product => Math.abs(product.price - itemPrice) / itemPrice <= 0.1,
    );
  });

  return similarProducts;
};
