import { ProductDetails } from '../types/ProductDetails';
import { Product } from '../types/Products';

export type SortOption = 'age' | 'price' | 'name';

export const API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
export const API_PRODUCT_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProductDetails(url: string): Promise<ProductDetails> {
  return wait(500)
    .then(() => fetch(url))
    .then(response => response.json());
}

export async function getProducts(data: string): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(data))
    .then(response => response.json());
}

export const updateSearchParams = (
  searchParams: URLSearchParams,
  newParams: Record<string, string>,
) => {
  Object.entries(newParams).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  return new URLSearchParams(searchParams.toString());
};

export const sortProducts = (
  products: Product[],
  sortBy: SortOption,
): Product[] => {
  switch (sortBy) {
    case 'age':
      return [...products].sort((a, b) => +b.year - +a.year);
    case 'price':
      return [...products].sort((a, b) => a.price - b.price);
    case 'name':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
};
