import { Product, ProductDetails } from '../modules/shared/types/Product';
import { ProductCategory } from '../modules/shared/types/ProductCategory';
import { getData } from './data';

export const getProducts = (): Promise<Product[]> => {
  return getData<Product[]>('/products.json');
};

export const getProductsByCategory = async (
  category: ProductCategory,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getSuggestedProducts = (
  products: Product[],
  productId: string,
): Product[] => {
  return products
    .filter(product => product.itemId !== productId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);
};

export const getProductsDetailsByCategory = async (
  category: ProductCategory,
): Promise<ProductDetails[]> => {
  return getData<ProductDetails[]>(`/${category}.json`);
};

export const getProductDetailsById = async (
  productId: string,
  category: ProductCategory,
) => {
  const productsDetails = await getProductsDetailsByCategory(category);

  return productsDetails.find(product => product.id === productId);
};
