/* eslint-disable no-console */
import { Product } from '../types/Product';
import { ProductDetail } from '../types/ProductDetail';

const BASE_URL = '';

//====Helper to simulate network delay for testing loading states
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// =====Generic request wrapper with a built-in delay
async function request<T>(url: string): Promise<T> {
  // Simulating 300ms delay to see Loaders in action
  await wait(300);

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

// === Specific API Calls ===

export const getProducts = () => request<Product[]>('/api/products.json');

export const getPhones = () => request<ProductDetail[]>('/api/phones.json');

export const getTablets = () => request<ProductDetail[]>('/api/tablets.json');

export const getAccessories = () =>
  request<ProductDetail[]>('/api/accessories.json');

// =======Fetches specific product details by checking all category files.
export const getProductDetails = async (
  productId: string,
): Promise<ProductDetail | null> => {
  try {
    const [phones, tablets, accessories] = await Promise.all([
      getPhones(),
      getTablets(),
      getAccessories(),
    ]);

    const allDetails = [...phones, ...tablets, ...accessories];

    return allDetails.find(item => item.id === productId) || null;
  } catch (error) {
    console.error('Error fetching product details:', error);

    return null;
  }
};

// =====Returns products in random order for the "You may also like" section

export const getSuggestedProducts = async (currentProductId: string) => {
  const products = await getProducts();

  // Simple shuffle logic
  return [...products]
    .filter(product => product.itemId !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);
};
