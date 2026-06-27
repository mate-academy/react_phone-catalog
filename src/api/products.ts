import { Product } from '../types/Product';

import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = '/api/products.json';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const allProducts = await getProducts();

  return allProducts.filter(product => product.category === category);
};

export const getProductById = async (
  productId: string,
): Promise<ProductDetails> => {
  const allProducts = await getProducts();

  const basicProduct = allProducts.find(
    (p: Product) => p.itemId === productId || String(p.id) === productId,
  );

  if (!basicProduct) {
    throw new Error(`Product with id ${productId} not found in basic list`);
  }

  const response = await fetch(`/api/${basicProduct.category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${basicProduct.category} details`);
  }

  const detailedProducts: ProductDetails[] = await response.json();

  const detailedProduct = detailedProducts.find(p => p.id === productId);

  if (!detailedProduct) {
    throw new Error(`Detailed product with id ${productId} not found`);
  }

  return detailedProduct;
};

export const getSuggestedProducts = async (): Promise<Product[]> => {
  const allProducts = await getProducts();

  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 10);
};
