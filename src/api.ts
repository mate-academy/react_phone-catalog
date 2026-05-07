import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';

const getProductDetailsByPath = (path: string): Promise<ProductDetails[]> =>
  fetch(path).then(response => response.json());

const getProductsByCategory = (
  category: Product['category'],
): Promise<Product[]> => {
  return fetch('/api/products.json')
    .then(response => response.json())
    .then((products: Product[]) =>
      products.filter(product => product.category === category),
    );
};

export const getAllProducts = (): Promise<Product[]> => {
  return fetch('/api/products.json').then(response => response.json());
};

export const getPhones = (): Promise<Product[]> =>
  getProductsByCategory('phones');

export const getTablets = (): Promise<Product[]> =>
  getProductsByCategory('tablets');

export const getAccessories = (): Promise<Product[]> =>
  getProductsByCategory('accessories');

export const getProductVariants = async (
  category: ProductDetails['category'],
  namespaceId: string,
): Promise<ProductDetails[]> => {
  const products = await getProductDetailsByPath(`/api/${category}.json`);

  return products.filter(product => product.namespaceId === namespaceId);
};

export const getProductById = async (
  productId: string,
): Promise<ProductDetails | undefined> => {
  const [phones, tablets, accessories] = await Promise.all([
    getProductDetailsByPath('/api/phones.json'),
    getProductDetailsByPath('/api/tablets.json'),
    getProductDetailsByPath('/api/accessories.json'),
  ]);

  const allProducts: ProductDetails[] = [...phones, ...tablets, ...accessories];

  return allProducts.find(product => product.id === productId);
};

export const getSuggestedProducts = async (
  currentItemId: string,
): Promise<Product[]> => {
  const products = await getAllProducts();

  return products
    .filter(product => product.itemId !== currentItemId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
};
