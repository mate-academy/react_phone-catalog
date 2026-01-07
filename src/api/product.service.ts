import { Category } from '@/types/Category';
import { Options } from '@/types/FetchOptions';
import { Product } from '@/types/Product';
import { client } from '@/utils/fetchClient';

export function getProducts(options: Options = {}) {
  return client.get<Product[]>('products.json', options);
}

export function getProductsByCategory(
  category: Category,
  options: Options = {},
) {
  return client
    .get<Product[]>('products.json', options)
    .then(res => res.filter(item => item.category === category));
}

export function getProductsByQuery(
  query: string,
  quantity: number = 10,
  options: Options = {},
) {
  return client
    .get<Product[]>('products.json', options)
    .then(res =>
      res
        .filter(item =>
          item.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, quantity),
    );
}
