import { Product, ProductDetails } from '../types';

const API_BASE = './api';

const fixImagePath = (imagePath: string): string => {
  // Remove leading slash and prepend with base URL
  return `${import.meta.env.BASE_URL}${imagePath.slice(1)}`;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE}/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await response.json();

  return products.map((product: Product) => ({
    ...product,
    image: fixImagePath(product.image),
  }));
};

export const getPhones = async (): Promise<ProductDetails[]> => {
  const response = await fetch(`${API_BASE}/phones.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch phones');
  }

  const phones = await response.json();

  return phones.map((phone: ProductDetails) => ({
    ...phone,
    images: phone.images?.map(fixImagePath) || [],
  }));
};

export const getTablets = async (): Promise<ProductDetails[]> => {
  const response = await fetch(`${API_BASE}/tablets.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch tablets');
  }

  const tablets = await response.json();

  return tablets.map((tablet: ProductDetails) => ({
    ...tablet,
    images: tablet.images?.map(fixImagePath) || [],
  }));
};

export const getAccessories = async (): Promise<ProductDetails[]> => {
  const response = await fetch(`${API_BASE}/accessories.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch accessories');
  }

  const accessories = await response.json();

  return accessories.map((accessory: ProductDetails) => ({
    ...accessory,
    images: accessory.images?.map(fixImagePath) || [],
  }));
};

export const getProductDetails = async (
  category: string,
  productId: string,
): Promise<ProductDetails | null> => {
  let products: ProductDetails[];

  switch (category) {
    case 'phones':
      products = await getPhones();
      break;
    case 'tablets':
      products = await getTablets();
      break;
    case 'accessories':
      products = await getAccessories();
      break;
    default:
      return null;
  }

  return products.find(product => product.id === productId) || null;
};

export const getSuggestedProducts = async (
  currentProductId: string,
  limit: number = 8,
): Promise<Product[]> => {
  const products = await getProducts();
  // Simple random selection excluding current product
  const filtered = products.filter(p => p.itemId !== currentProductId);
  const shuffled = filtered.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, limit);
};

export const getProductDetailsById = async (
  productId: string,
): Promise<ProductDetails | null> => {
  // Try phones first
  let products = await getPhones();
  let product = products.find(p => p.id === productId);

  if (product) {
    return product;
  }

  // Try tablets
  products = await getTablets();
  product = products.find(p => p.id === productId);
  if (product) {
    return product;
  }

  // Try accessories
  products = await getAccessories();
  product = products.find(p => p.id === productId);

  return product || null;
};
