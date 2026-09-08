import { CategoriesTypes } from '../modules/shared/Types/types';
import { UpdatedProduct } from '../modules/shared/Types/types';
import { ProductDetails } from '../modules/shared/Types/types';
import { getData } from '../utils/fetchClient';

export function getProductsByCategory(
  type: CategoriesTypes,
): Promise<UpdatedProduct[]> {
  return getData<UpdatedProduct[]>(`products.json`).then(products => {
    if (!Array.isArray(products)) {
      return [];
    }

    return products.filter(product => product && product.category === type);
  });
}

export function getAllProducts(): Promise<UpdatedProduct[]> {
  return getData<UpdatedProduct[]>(`products.json`);
}

export function getProductsByDetails(
  category: string,
): Promise<ProductDetails[]> {
  return getData<ProductDetails[]>(`${category}.json`);
}
