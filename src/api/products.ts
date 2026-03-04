import {
  BaseProduct,
  CatalogProducts,
  CategoriesType,
  PathType,
  PhoneType,
  Product,
  TabletType,
} from '../types/Types';
import { getData } from './fetchClient';

export const getProducts = () => {
  return getData<CatalogProducts[]>(`${PathType.PRODUCTS}.json`);
};

export const getPhones = () => {
  return getData<PhoneType[]>(`${PathType.PHONES}.json`);
};

export const getTablets = () => {
  return getData<TabletType[]>(`${PathType.TABLETS}.json`);
};

export const getAccessories = () => {
  return getData<BaseProduct[]>(`${PathType.ACCESSORIES}.json`);
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
      path = PathType.PHONES;
  }

  const products = await getData<Product[]>(`${path}.json`);

  const product = products.find(item => item.id === itemId);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
