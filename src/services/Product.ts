import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';
import { PRODUCTS_URL, getCategoryUrl } from '../utils/constants';
import { Category } from '../types/Category';
import { ProductDetails } from '../types/ProductDetails';
import { ShuffleArray } from '../utils/shaffle';

export const getAllProducts = async (): Promise<Product[]> => {
  return getData<Product[]>(PRODUCTS_URL);
};

export const getProductByIdFromCategory = async (id: string, url: Category) => {
  const product = await getData<ProductDetails[]>(getCategoryUrl(url));

  return product.find((item: ProductDetails) => item.id === id);
};

export const getProductsByCategory = async (category: Category) => {
  const products = await getData<Product[]>(PRODUCTS_URL);

  return products.filter((product: Product) => product.category === category);
};

export const getHotPriceProducts = async () => {
  const products = await getData<Product[]>(PRODUCTS_URL);

  return products.sort((a: Product, b: Product) => {
    return b.fullPrice - b.price - (a.fullPrice - a.price);
  });
};

export const getNewProducts = async () => {
  const products = await getData<Product[]>(PRODUCTS_URL);
  const latestYear = products.reduce(
    (acc: number, product: Product) => Math.max(acc, product.year),
    0,
  );

  return products
    .filter((product: Product) => product.year === latestYear)
    .sort((a: Product, b: Product) => b.fullPrice - a.fullPrice);
};

export const getProductByParams = async (
  category: Category,
  namespaceId: string,
  color: string,
  capacity: string,
) => {
  const products = await getData<ProductDetails[]>(getCategoryUrl(category));

  const newProduct = products.find(
    p =>
      p.namespaceId === namespaceId &&
      p.color === color &&
      p.capacity === capacity,
  );

  return newProduct;
};

export const getSuggestedProducts = async () => {
  const products = await getData<Product[]>(PRODUCTS_URL);
  const suggestedProducts = ShuffleArray(products);

  return suggestedProducts;
};
