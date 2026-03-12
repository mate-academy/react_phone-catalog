// This is a helper to simulate a delay for loading states
const BASE_URL = '';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function request<T>(url: string): Promise<T> {
  await wait(300);

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const getProducts = () =>
  request<import('../types/Product').Product[]>('api/products.json');
export const getPhones = () =>
  request<import('../types/ProductDetails').ProductDetails[]>(
    'api/phones.json',
  );
export const getTablets = () =>
  request<import('../types/ProductDetails').ProductDetails[]>(
    'api/tablets.json',
  );
export const getAccessories = () =>
  request<import('../types/ProductDetails').ProductDetails[]>(
    'api/accessories.json',
  );

export const getProductDetails = async (
  productId: string,
): Promise<import('../types/ProductDetails').ProductDetails | null> => {
  const [phones, tablets, accessories] = await Promise.all([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]);

  const allDetails = [...phones, ...tablets, ...accessories];

  return allDetails.find(item => item.id === productId) || null;
};

export const getSuggestedProducts = async () => {
  const products = await getProducts();

  return [...products].sort(() => Math.random() - 0.5);
};
