import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';
import { PRODUCTS_URL, getCategoryUrl } from '../utils/constants';
import { Category } from '../types/Category';
import { ProductDetails } from '../types/ProductDetails';

export const getAllProducts = async (): Promise<Product[]> => {
  return getData<Product[]>(PRODUCTS_URL);
};

export const getProductByIdFromCategory = async (id: string, url: Category) => {
  const data = await getData<ProductDetails[]>(getCategoryUrl(url));

  return data.find((item: ProductDetails) => item.id === id);
};

export const getProductsByCategory = async (category: Category) => {
  const products = await getData<Product[]>(PRODUCTS_URL);

  return products.filter((product: Product) => product.category === category);
};

export const getHotPriceProducts = async () => {
  const response = await getData<Product[]>(PRODUCTS_URL);

  return response.sort((a: Product, b: Product) => {
    return b.fullPrice - b.price - (a.fullPrice - a.price);
  });
};

export const getNewProducts = async () => {
  const response = await getData<Product[]>(PRODUCTS_URL);
  const latestYear = response.reduce(
    (acc: number, product: Product) => Math.max(acc, product.year),
    0,
  );

  return response
    .filter((product: Product) => product.year === latestYear)
    .sort((a: Product, b: Product) => b.fullPrice - a.fullPrice);
};

// export const getSuggestedProducts = async () => {
//   const products = await getData<Product[]>(PRODUCTS_URL);
//   const suggestedProducts = ShuffleArray(products);

//   return suggestedProducts;
// };
