import { Product } from './types/product';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const shuffle = <T>(array: T[]) => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy;
};

export const getSuggestedProducts = async (itemId: string | undefined) => {
  if (!itemId) {
    return [];
  }

  const response = await fetch('/public/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const products: Product[] = await response.json();
  const filteredProducts = products.filter(prod => prod.itemId !== itemId);

  return shuffle(filteredProducts).slice(0, 10);
};

export const getProductById = async (id: string) => {
  const productsResponse = await fetch('/api/products.json');

  if (!productsResponse.ok) {
    throw new Error('Failed to load products');
  }

  const products: Product[] = await productsResponse.json();

  const product = products.find(item => item.itemId === id);

  if (!product) {
    return undefined;
  }

  let detailsResponse: Response;

  switch (product.category) {
    case 'phones':
      detailsResponse = await fetch('/api/phones.json');
      break;

    case 'tablets':
      detailsResponse = await fetch('/api/tablets.json');
      break;

    case 'accessories':
      detailsResponse = await fetch('/api/accessories.json');
      break;

    default:
      return undefined;
  }

  if (!detailsResponse.ok) {
    throw new Error('Failed to load product details');
  }

  const details = await detailsResponse.json();

  return wait(300).then(() => {
    return details.find((item: { id: string }) => item.id === id);
  });
};

export const getPhones = async (): Promise<Product[]> => {
  const response = await fetch('/public/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const products: Product[] = await response.json();

  return wait(300).then(() => {
    return products.filter(product => product.category === 'phones');
  });
};

export const getTablets = async (): Promise<Product[]> => {
  const response = await fetch('/public/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const products: Product[] = await response.json();

  return wait(300).then(() => {
    return products.filter(product => product.category === 'tablets');
  });
};

export const getAccessories = async (): Promise<Product[]> => {
  const response = await fetch('/public/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const products: Product[] = await response.json();

  return wait(300).then(() => {
    return products.filter(product => product.category === 'accessories');
  });
};
