import {
  Accessories,
  Phone,
  Product,
  ProductsWithDetails,
  Tablets,
} from '../_types/products';
import { getData } from '../_utils/httpClient';

export async function getProductsWithDetails() {
  try {
    const products = await getData<Product[]>('/products.json');
    const phones = await getData<Phone[]>('/phones.json');
    const accessories = await getData<Accessories[]>('/accessories.json');
    const tablets = await getData<Tablets[]>('/tablets.json');

    return products.map((product: Product): ProductsWithDetails => {
      return {
        ...product,
        details:
          phones.find(item => product.itemId === item.id) ||
          tablets.find(item => product.itemId === item.id) ||
          accessories.find(item => product.itemId === item.id) ||
          null,
      };
    });
  } catch {
    throw new Error();
  }
}

export const sortProducts = <T>(
  initProducts: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'desc',
): T[] => {
  const result = [...initProducts];

  result.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }

    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });

  return result;
};
