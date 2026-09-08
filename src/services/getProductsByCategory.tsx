import { CategoriesTypes } from '../types/CategoriesTypes';
// import { Product } from '../types/Product';
import { UpdatedProduct } from '../types/UpdatedProduct';
import { getData } from '../utils/httpClient';

export function getProductsByCategory(
  type: CategoriesTypes,
): Promise<UpdatedProduct[]> {
  return getData<UpdatedProduct[]>(`products.json`).then(products =>
    products.filter(product => product.category === type),
  );
}
