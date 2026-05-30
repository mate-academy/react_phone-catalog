import { Category, Product, ProductDetails } from '../types/Product';
import { getData } from './clients';

export const getAllProducts = () => getData<Product[]>('products');

export const getProductList = async (category: Category) => {
  const list = await getAllProducts();

  return list.filter(product => product.category === category);
};

export const getProductsByCategoty = (category: Category) =>
  getData<ProductDetails[]>(category);

export const getProductById = async (
  productId: string,
): Promise<ProductDetails | null> => {
  const [phones, tablets, accessories] = await Promise.all([
    getProductsByCategoty('phones'),
    getProductsByCategoty('tablets'),
    getProductsByCategoty('accessories'),
  ]);

  const productsList = [
    ...phones,
    ...tablets,
    ...accessories,
  ] as ProductDetails[];

  const product = productsList.find(prod => prod.id === productId);

  if (product) {
    product.productId = Math.ceil(Math.random() * 100000);
  }

  return product || null;
};

export const getSuggestedProducts = async (
  number: number,
  category: Category,
): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  const suggestedProducts = allProducts
    .filter(product => product.category === category)
    .map(product => ({
      ...product,
      productId: Math.random(),
    }))
    .sort((a, b) => a.productId - b.productId)
    .slice(0, number);

  return suggestedProducts;
};

export const getProductsByIds = async (ids: Set<string>) => {
  const [phones, tablets, accessories] = await Promise.all([
    getProductList('phones'),
    getProductList('tablets'),
    getProductList('accessories'),
  ]);

  const productsList = [...phones, ...tablets, ...accessories].filter(product =>
    ids.has(product.itemId),
  );

  return productsList;
};
