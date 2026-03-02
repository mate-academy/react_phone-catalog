import { Product, ProductDetails } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wait(delay: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function request<T>(url: string): Promise<T> {
  return wait(300)
    .then(() => fetch(url))
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }

      return response.json();
    });
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('api/products.json');
}

export function getPhones(): Promise<ProductDetails[]> {
  return request<ProductDetails[]>('api/phones.json');
}

export function getTablets(): Promise<ProductDetails[]> {
  return request<ProductDetails[]>('api/tablets.json');
}

export function getAccessories(): Promise<ProductDetails[]> {
  return request<ProductDetails[]>('api/accessories.json');
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails | null> {
  const [phones, tablets, accessories] = await Promise.all([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]);

  const allProducts = [...phones, ...tablets, ...accessories];

  return allProducts.find(product => product.id === productId) || null;
}

export function getSuggestedProducts(
  products: Product[],
  currentId: string,
): Product[] {
  const filtered = products.filter(p => p.itemId !== currentId);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 10);
}
