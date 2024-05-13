import { Product } from '../types/Product';
import { ProductCategories } from '../types/ProductCategories';

const BASE_URL = 'https://olafchuszno.github.io/react_phone-catalog';

export const getProductsByCategory: (
  category: ProductCategories,
) => Promise<Product[]> = (category: ProductCategories) => {
  return fetch(BASE_URL + `/api/${category}.json`)
    .then(response => response.json())
    .then(parsed => parsed);
};
