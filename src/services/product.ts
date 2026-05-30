import { getData } from '../utils/httpClient';
import { ProductType } from '../types/ProductType';

export const getProduct = async (
  category: string,
  productId: string,
): Promise<ProductType> => {
  const url = `/${category}.json`;

  try {
    return await getData<ProductType[]>(url).then(
      products =>
        (products.find(product => product.id === productId) as ProductType) ||
        null,
    );
  } catch (err) {
    throw new Error(`${err}`);
  }
};
