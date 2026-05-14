import {
  CatalogProducts,
  CategoriesType,
  PathType,
  Product,
} from '../types/Types';
import { getData } from './fetchClient';

export const getProducts = () => {
  return getData<CatalogProducts[]>(`${PathType.PRODUCTS}.json`);
};

export const getPhones = async () => {
  const products = await getProducts();

  return products.filter(product => product.category === CategoriesType.PHONES);
};

export const getTablets = async () => {
  const products = await getProducts();

  return products.filter(
    product => product.category === CategoriesType.TABLETS,
  );
};

export const getAccessories = async () => {
  const products = await getProducts();

  return products.filter(
    product => product.category === CategoriesType.ACCESSORIES,
  );
};

export const getProductById = async (category: string, itemId: string) => {
  let path = '';

  switch (category) {
    case CategoriesType.PHONES:
      path = PathType.PHONES;
      break;
    case CategoriesType.TABLETS:
      path = PathType.TABLETS;
      break;
    case CategoriesType.ACCESSORIES:
      path = PathType.ACCESSORIES;
      break;
    default:
      throw new Error('Unknown category');
  }

  const products = await getData<Product[]>(`${path}.json`);

  const product = products.find(item => item.id === itemId);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const getSuggestedProducts = async () => {
  const products = await getProducts();

  return [...products].sort(() => Math.random() - 0.5).slice(0, 12);
};
