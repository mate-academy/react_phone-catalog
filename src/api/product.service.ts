import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { client } from '@/utils/fetchClient';

export function getProducts() {
  return client.get<Product[]>('products.json');
}

export function getProductsByCategory(category: Category) {
  return client
    .get<Product[]>('products.json')
    .then(res => res.filter(item => item.category === category));
}

export function getProductsByQuery(query: string, quantity: number = 10) {
  return client
    .get<Product[]>('products.json')
    .then(res =>
      res
        .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, quantity),
    );
}
