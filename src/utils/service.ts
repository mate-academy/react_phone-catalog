import { Products } from '../types/products';

export function getProducts(categories: string): Promise<Products[]> {
  return fetch('./api/products.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to fetch users');
    })
    .then((products: Products[]) =>
      products.filter(product => product.category === categories),
    );
}
