import { request } from './request';
import { Product, ProductCategory } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = () => request<Product[]>('products.json');

const detailsUrlByCategory: Record<ProductCategory, string> = {
  phones: 'phones.json',
  tablets: 'tablets.json',
  accessories: 'accessories.json',
};

export const getProductDetailsByCategory = (category: ProductCategory) => {
  return request<ProductDetails[]>(detailsUrlByCategory[category]);
};

export const getPhones = () => request<ProductDetails[]>('phones.json');

export const getTablets = () => request<ProductDetails[]>('tablets.json');

export const getAccessories = () =>
  request<ProductDetails[]>('accessories.json');

export const getProductByItemId = async (
  itemId: string,
): Promise<ProductDetails | null> => {
  const [phones, tablets, accessories] = await Promise.all([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]);

  const allDetails = [...phones, ...tablets, ...accessories];

  return allDetails.find(product => product.id === itemId) ?? null;
};

export const getSuggestedProducts = async (
  product: ProductDetails,
  count = 4,
): Promise<Product[]> => {
  const products = await getProducts();

  const sameCategory = products.filter(
    item => item.category === product.category && item.itemId !== product.id,
  );

  const shuffled = [...sameCategory].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
};
