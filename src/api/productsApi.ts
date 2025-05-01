import { ApiRoutes } from '@enums/ApiRoutes';
import { CategoryName } from '@enums/CategoryName';
import { ProductDetailsType } from 'types/productInfoTypes';
import { ProductType } from 'types/productTypes';

export const BASE_URL = 'https://OlehYavoriv.github.io/react_phone-catalog/';

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
): Promise<ProductDetailsType | null> => {
  let categoryApiUrl = '';

  if (
    ![
      CategoryName.PHONES,
      CategoryName.TABLETS,
      CategoryName.ACCESSORIES,
    ].includes(category as CategoryName)
  ) {
    throw new Error('Invalid category');
  }

  switch (category) {
    case CategoryName.PHONES:
      categoryApiUrl = ApiRoutes.PHONES;
      break;
    case CategoryName.TABLETS:
      categoryApiUrl = ApiRoutes.TABLETS;
      break;
    case CategoryName.ACCESSORIES:
      categoryApiUrl = ApiRoutes.ACCESSORIES;
      break;
  }

  try {
    const response = await fetch(BASE_URL + categoryApiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const products: ProductDetailsType[] = await response.json();

    const product = products.find(
      item => item.id.toLowerCase() === id.toLowerCase(),
    );

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    throw error;
  }
};
