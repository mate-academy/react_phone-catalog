import { ProductCagetories } from '../types/ProductCategories';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { client } from '../utils/fetchClient';

export const getProductDetails = (
  category: ProductCagetories,
  productId: string,
) => {
  return client
    .get<ProductDetailsType[]>(`/${category}.json`)
    .then(products => products.find(product => product.id === productId))
    .catch(() => {
      throw new Error('Network error or server is unavailable');
    });
};
