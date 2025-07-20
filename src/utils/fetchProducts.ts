import type { Product } from '../types/product';
import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchDetailedProduct,
  fetchDetailedProductVariants,
} from './firebaseUtils';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    id: product.itemId,
  }));
}

export const firebaseApi = {
  getAllProducts: async () => {
    await wait(300);
    const productsFromApi = await fetchAllProducts();
    return normalizeProducts(productsFromApi);
  },

  getProductsByCategory: async (category: string) => {
    await wait(300);
    const productsFromApi = await fetchProductsByCategory(category);
    return normalizeProducts(productsFromApi);
  },

  getDetailedProduct: async (category: string, itemId: string) => {
    await wait(300);
    return fetchDetailedProduct(category, itemId);
  },

  getDetailedProductVariants: async (category: string, namespaceId: string) => {
    await wait(300);
    return fetchDetailedProductVariants(category, namespaceId);
  },
};

export { fetchDetailedProductVariants } from './firebaseUtils';
