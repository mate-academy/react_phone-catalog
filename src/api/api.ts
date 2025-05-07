import { ApiRoutes, Categories } from '../enums';
import { Product, ProductDetails, Slide } from '../types';

const BASE_URL = 'https://siefimov.github.io/react_phone-catalog';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(BASE_URL + ApiRoutes.PRODUCTS);

  if (!response.ok) {
    throw new Error('Failed to get products');
  }

  return response.json();
};

export const getProductById = async (
  id: string,
  category: string,
): Promise<ProductDetails> => {
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

  const products: ProductDetails[] = await response.json();

  const product = products.find(item => item?.id === id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const getSlidesData = async (): Promise<Slide[]> => {
  const response = await fetch(BASE_URL + ApiRoutes.SLIDES);

  if (!response.ok) {
    throw new Error('Failde to get slides');
  }

  return response.json();
};
