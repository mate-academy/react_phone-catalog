import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { ProductWithDetails } from '../types/ProductWithDetails';

// Relative path: works on localhost and on GitHub Pages
const API_URL = 'api';

// Fake network delay, so we can see the Loader while developing
const DELAY = 300;

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function request<T>(endpoint: string): Promise<T> {
  await wait(DELAY);

  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('products.json');
}

export async function getProductDetails(
  itemId: string,
): Promise<ProductWithDetails | null> {
  const products = await getProducts();
  const product = products.find(item => item.itemId === itemId);

  if (!product) {
    return null;
  }

  const allDetails = await request<ProductDetails[]>(
    `${product.category}.json`,
  );
  const details = allDetails.find(item => item.id === itemId);

  return details ? { product, details } : null;
}

const SUGGESTIONS_COUNT = 12;

// Fisher-Yates shuffle: every order has the same chance
function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export async function getSuggestedProducts(
  namespaceId: string,
): Promise<Product[]> {
  const products = await getProducts();

  // Variants of the current model: namespace + capacity + color
  const sameModel = new RegExp(`^${namespaceId}-\\d+(gb|tb|mm)-`);
  const others = products.filter(product => !sameModel.test(product.itemId));

  return shuffle(others).slice(0, SUGGESTIONS_COUNT);
}
