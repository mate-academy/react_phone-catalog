import { Product } from '../types/Product';
import { ProductFull } from '../types/ProductFull';
import { getData } from '../utils/httpClient';

export const getAllProducts = async (): Promise<Product[]> => {
  return getData<Product[]>('/api/products.json');
};

export const getProduct = async (
  itemId: string,
): Promise<ProductFull | undefined> => {
  const products = await getData<Product[]>('/api/products.json');

  const productCategory = products.find(
    (pr: Product) => pr.itemId === itemId,
  )?.category;

  if (!productCategory) {
    return undefined;
  }

  const productsByCategory = await getData<ProductFull[]>(
    `/api/${productCategory}.json`,
  );

  const productFinal = productsByCategory.find(
    (pr: ProductFull) => pr.id === itemId,
  );

  return productFinal;
};

export const getProductsByCategory = async (category: string) => {
  const products = await getData<Product[]>('/api/products.json');

  return products.filter((product: Product) => product.category === category);
};

export const getHotPriceProducts = async () => {
  const response = await getData<Product[]>('/api/products.json');

  return response.sort((a: Product, b: Product) => {
    return b.fullPrice - b.price - (a.fullPrice - a.price);
  });
};

export const getYouMayAlsoLike = async () => {
  const response = await getData<Product[]>('/api/products.json');

  for (let i = response.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [response[i], response[j]] = [response[j], response[i]];
  }

  return response;
};

export const getBrandNewModels = async () => {
  const response = await getData<Product[]>('/api/products.json');

  const maxYear = Math.max(...response.map(product => product.year));

  const noDiscountProductsMaxYear = response.filter(
    (product: Product) => product.year === maxYear,
  );

  return noDiscountProductsMaxYear.sort(
    (a: Product, b: Product) => b.price - a.price,
  );
};

export const getProductsById = async (
  favouriteIds: string[],
): Promise<Product[]> => {
  const allProducts = await getAllProducts();

  return allProducts.filter(product => favouriteIds.includes(product.itemId));
};
