import { Product } from '../types/ProductType';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(api: string): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(`./api/${api}.json`))
    .then(response => response.json());
}
