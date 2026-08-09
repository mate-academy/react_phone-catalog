// eslint-disable-next-line import/extensions
import { Product, ProductCategory, ProductDetails } from './types/Product';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(url))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  getProducts: (category: ProductCategory) =>
    request<Product[]>(`api/${category}.json`),

  getProductDeatils: async (id: string) => {
    const categories: ProductCategory[] = [
      'phones',
      'tablets',
      'accessories',
      'products',
    ];

    for (const category of categories) {
      const items = await request<Product[]>(`api/${category}.json`);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const found = items.find(items => items.id === id);

      if (found) {
        return found as ProductDetails;
      }
    }

    throw new Error(`Product with id "${id}" not found`);
  },

  getSuggestedProducts: async (category: ProductCategory, take = 10) => {
    const all = await request<Product[]>(`api/${category}.json`);

    return all.sort(() => Math.random() - 0.5).slice(0, take);
  },
};
