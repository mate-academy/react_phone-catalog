import { Product } from '../types/ProductCard';
import { ProductCategories } from '../types/ProductCategories';

const BASE_URL = 'https://olafchuszno.github.io/react_phone-catalog';

export const getProducts: (
  category: ProductCategories,
) => Promise<Product[]> = (category: ProductCategories) => {
  return fetch(BASE_URL + '/api/products.json')
    .then(response => response.json())
    .then((parsed: Product[]) =>
      parsed.filter((product: Product) => product.category === category),
    );
};
