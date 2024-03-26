import { Details } from './type/Details';
import { Products } from './type/Productes';

const API_URL = '/react_phone-catalog/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function fetchProducts(): Promise<Products[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}/products.json`))
    .then(response => response.json());
}

export async function getProducts(): Promise<Products[]> {
  return fetchProducts();
}

export async function getPhones(): Promise<Products[]> {
  const products = await fetchProducts();

  return products.filter(product => product.category === 'phones');
}

export async function getTablet(): Promise<Products[]> {
  const products = await fetchProducts();

  return products.filter(product => product.category === 'tablets');
}

export async function getAccessories(): Promise<Products[]> {
  const products = await fetchProducts();

  return products.filter(product => product.category === 'accessories');
}

export async function fetchDetails(
  category: string,
  itemId: string,
): Promise<Details[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}/${category}.json`))
    .then(response => response.json())
    .then((data: Details[]) => {
      const filter = data.filter(d => d.id === itemId);

      return filter;
    });
}
