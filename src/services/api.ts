import { Category, Product, ProductDetails } from '../types/catalog';
import { getPublicAssetPath } from '../utils/category';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(getPublicAssetPath('/api/products.json'));

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json() as Promise<Product[]>;
};

export const getCategoryProducts = async (
  category: Category,
): Promise<ProductDetails[]> => {
  const response = await fetch(getPublicAssetPath(`/api/${category}.json`));

  if (!response.ok) {
    throw new Error(`Failed to load ${category}`);
  }

  return response.json() as Promise<ProductDetails[]>;
};

export const getProductsByCategory = async (category: Category) => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getProductDetails = async (productId: string) => {
  const products = await getProducts();
  const currentProduct = products.find(product => product.itemId === productId);

  if (!currentProduct) {
    return null;
  }

  const categoryProducts = await getCategoryProducts(currentProduct.category);

  return categoryProducts.find(product => product.id === productId) ?? null;
};

export const getRecommendedProducts = async (
  currentProductId: string,
  limit = 8,
) => {
  const products = await getProducts();

  return products
    .filter(product => product.itemId !== currentProductId)
    .slice(0, limit);
};

export const getProductVariants = async (
  category: Category,
  namespaceId: string,
) => {
  const products = await getCategoryProducts(category);

  return products.filter(product => product.namespaceId === namespaceId);
};
