import { getProduct } from '../api/fetchClient';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { customArray } from './customArray';

export const getAllProudct = async () => {
  return getProduct<Product[]>('/api/products.json');
};

export const getNewProduct = async () => {
  const response = await getProduct<Product[]>('/api/products.json');

  return response.sort((a, b) => b.year - a.year);
};

export const getHotProduct = async () => {
  const response = await getProduct<Product[]>('/api/products.json');

  return response.sort(
    (a, b) => b.fullPrice - a.fullPrice - (a.fullPrice - a.price),
  );
};

export const getProductDetails = async (
  itemId: string,
  category = 'products',
) => {
  const categoryDetails: ProductDetails[] = await getProduct<ProductDetails[]>(
    `/api/${category}.json`,
  );

  const details = categoryDetails.find(item => item.id === itemId);

  return details ?? null;
};

export const getColorAndCapacity = async (
  category: string,
  namespaceId: string,
  color: string,
  capacity: string,
): Promise<string | undefined> => {
  const allProduct = await getProduct<ProductDetails[]>(
    `/api/${category}.json`,
  );

  const findProduct = allProduct.find(
    item =>
      item.namespaceId === namespaceId &&
      item.color === color &&
      item.capacity === capacity,
  );

  return findProduct ? findProduct.id : undefined;
};

export const getSuggestedProducts = async () => {
  const response = await getProduct<Product[]>('/api/products.json');

  const suggestedProducts = customArray(response);

  return suggestedProducts;
};
