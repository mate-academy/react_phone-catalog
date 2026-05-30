import { ApiRoutes } from '../enums/ApiRoutes';
import { Categories } from '../enums/Categories';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { ProductType } from '../types/ProductType';
import { Slide } from '../types/SlideType';

const BASE_URL = 'https://bezushk0.github.io/react_phone-catalog';

export const getSlidesData = async (): Promise<Slide[]> => {
  const response = await fetch(BASE_URL + ApiRoutes.SLIDES);

  if (!response.ok) {
    throw new Error('Failed to get slides');
  }

  return response.json();
};

export const getProducts = async (): Promise<ProductType[]> => {
  const response = await fetch(BASE_URL + ApiRoutes.PRODUCTS);

  if (!response.ok) {
    throw new Error('Failed to get products');
  }

  return response.json();
};

export const getProductById = async (
  id: string,
  category: string,
): Promise<ProductDetailsType> => {
  let url = '';

  switch (category) {
    case Categories.PHONES:
      url = ApiRoutes.PHONES;
      break;
    case Categories.TABLETS:
      url = ApiRoutes.TABLETS;
      break;
    case Categories.ACCESSORIES:
      url = ApiRoutes.ACCESSORIES;
      break;
    default:
      throw new Error('Unknown category');
  }

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error('Fail to get product');
  }

  const products: ProductDetailsType[] = await response.json();
  const product = products.find(item => item?.id === id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
