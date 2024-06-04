import { DetailedProduct } from '../types/DetailedProduct';
import { ProductCategories } from '../types/ProductCategories';

const BASE_URL =
  location.hostname === 'localhost'
    ? ''
    : 'https://olafchuszno.github.io/react_phone-catalog';

export const GetDetailedProducts: (
  category: ProductCategories,
) => Promise<DetailedProduct[]> = (category: ProductCategories) => {
  return fetch(`${BASE_URL}/api/${category}.json`)
    .then(response => response.json())
    .then((parsed: DetailedProduct[]) => {
      return parsed.filter(
        (product: DetailedProduct) => product.category === category,
      );
    });
};
