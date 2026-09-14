import type { Product } from '../types/Product';
import type { ProductDetails } from '../types/ProductDetails';

export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export type ProductCatalog = {
  products: Product[];
  details: Record<ProductCategory, ProductDetails[]>;
};

let catalogPromise: Promise<ProductCatalog> | null = null;

const fetchJson = async <T>(path: string): Promise<T> => {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');

  await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await fetch(`${baseUrl}/${cleanPath}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json() as Promise<T>;
};

export const getProductCatalog = (): Promise<ProductCatalog> => {
  if (!catalogPromise) {
    catalogPromise = Promise.all([
      fetchJson<Product[]>('api/products.json'),
      fetchJson<ProductDetails[]>('api/phones.json'),
      fetchJson<ProductDetails[]>('api/tablets.json'),
      fetchJson<ProductDetails[]>('api/accessories.json'),
    ]).then(([products, phones, tablets, accessories]) => ({
      products,
      details: {
        phones,
        tablets,
        accessories,
      },
    }));
  }

  return catalogPromise;
};
