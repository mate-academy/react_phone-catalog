import { Product } from '../types/Product';
import { ProductDetailed } from '../types/ProductDetailed';
import { getData } from './fetchClient';

// base products

export const getAllProducts = (): Promise<Product[]> =>
  getData<Product[]>('products.json')
    .then(() => {
      throw new Error('Failed to load products.');
    })
    .catch(() => {
      throw new Error('Failed to load products.');
    });

export const getProductsByCategory = (category: string): Promise<Product[]> =>
  getAllProducts().then(products =>
    products.filter(product => product.category === category),
  );

export const getProductsByIds = (ids: string[]): Promise<Product[]> =>
  getAllProducts().then(products =>
    products.filter(product => ids.includes(product.itemId)),
  );

export const getProductById = (id: string): Promise<Product | null> =>
  getAllProducts().then(
    products => products.find(product => product.itemId === id) || null,
  );

// Detailed products

export const getDetailedProductsByCategory = (
  category: string,
): Promise<ProductDetailed[]> =>
  getData<ProductDetailed[]>(`${category}.json`).catch(() => {
    throw new Error(`Failed to load ${category} category.`);
  });

export const getDetailedProductById = async (
  category: string,
  productId: string,
  products?: ProductDetailed[],
): Promise<ProductDetailed> => {
  const productList =
    products || (await getDetailedProductsByCategory(category));
  const existingProduct = productList.find(product => product.id === productId);

  if (!existingProduct) {
    throw new Error(`Product with id "${productId}" not found in ${category}.`);
  }

  return existingProduct;
};

export const getDetailedProductsByNamespaceId = async (
  category: string,
  namespaceId: string,
  products?: ProductDetailed[],
): Promise<ProductDetailed[]> => {
  const productList =
    products || (await getDetailedProductsByCategory(category));

  return productList.filter(product => product.namespaceId === namespaceId);
};
