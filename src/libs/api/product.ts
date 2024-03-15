import { IProductDetails, ProductCategory } from '../types';
import { client } from '../utils/fetchClient';

export const getProductDetails = async (
  productId: string,
  categoryName: ProductCategory,
) => {
  const response = await client.get<IProductDetails[]>(`/api/products/${categoryName}.json`);

  return response.find(product => product.id === productId);
};
