import {
  Category,
  Phone,
  Product,
  ProductWithDetails,
} from '../_types/products';
import { getData } from '../_utils/httpClient';

export async function getProductWithDetails(
  category: Category,
): Promise<ProductWithDetails[]> {
  try {
    const products = await getData<Product[]>('/products.json');
    const details = await getData<Phone[]>(`/${category}.json`);

    return products
      .filter(product => product.category === category)
      .map(product => {
        return {
          ...product,
          details: details.find(item => product.itemId === item.id) || null,
        };
      });
  } catch {
    throw new Error();
  }
}

export async function getProducById(id: string): Promise<ProductWithDetails> {
  try {
    const products = await getData<Product[]>('/products.json');
    const product = products.find(item => item.itemId === id);

    if (!product) {
      throw new Error('Product was not found');
    }

    const detailsByCategory = await getData<Phone[]>(
      `/${product.category}.json`,
    );

    const details = detailsByCategory.find(item => item.id === id);

    return {
      ...product,
      details: details || null,
    };
  } catch {
    throw new Error('Product was not found');
  }
}

export async function getProducts() {
  try {
    const products = await getData<Product[]>('/products.json');

    return products;
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

export const filteredByCategory = (category: Category, products: Product[]) =>
  products.filter(product => product.category === category);

export function getPreparedProducts(
  initProducts: ProductWithDetails[],
  sortFieldName: string,
) {
  switch (sortFieldName) {
    case 'age':
      return sortProducts(initProducts, 'year');
    case 'id':
      return sortProducts(initProducts, 'itemId', 'asc');
    case 'price':
      return sortProducts(initProducts, 'price', 'asc');
    default:
      return initProducts;
  }
}
