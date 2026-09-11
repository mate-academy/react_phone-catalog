import type { Product } from './components/ProductCardSale';

export const getProduct = async (
  productId: string,
): Promise<Product | undefined> => {
  const [phones, tablets, accessories]: Product[][] = await Promise.all([
    fetch('api/phones.json').then(response => response.json()),
    fetch('api/tablets.json').then(response => response.json()),
    fetch('api/accessories.json').then(response => response.json()),
  ]);

  return (
    phones.find(product => product.id === productId) ||
    tablets.find(product => product.id === productId) ||
    accessories.find(product => product.id === productId)
  );
};

export const getSuggestedProducts = async (
  currentProductId: string,
): Promise<Product[]> => {
  const [phones, tablets, accessories]: Product[][] = await Promise.all([
    fetch('api/phones.json').then(response => response.json()),
    fetch('api/tablets.json').then(response => response.json()),
    fetch('api/accessories.json').then(response => response.json()),
  ]);

  const products = [...phones, ...tablets, ...accessories];

  return products
    .filter(product => product.id !== currentProductId)
    .sort(() => Math.random() - 0.5);
};

export const getProductByColor = async (
  product: Product,
  color: string,
): Promise<Product | undefined> => {
  const [phones, tablets, accessories]: Product[][] = await Promise.all([
    fetch('api/phones.json').then(response => response.json()),
    fetch('api/tablets.json').then(response => response.json()),
    fetch('api/accessories.json').then(response => response.json()),
  ]);

  const products = [...phones, ...tablets, ...accessories];

  return products.find(
    item =>
      item.namespaceId === product.namespaceId &&
      item.capacity === product.capacity &&
      item.color === color,
  );
};

export const getProductByCapacity = async (
  product: Product,
  capacity: string,
): Promise<Product | undefined> => {
  const [phones, tablets, accessories]: Product[][] = await Promise.all([
    fetch('api/phones.json').then(response => response.json()),
    fetch('api/tablets.json').then(response => response.json()),
    fetch('api/accessories.json').then(response => response.json()),
  ]);

  const products = [...phones, ...tablets, ...accessories];

  return products.find(
    item =>
      item.namespaceId === product.namespaceId &&
      item.color === product.color &&
      item.capacity === capacity,
  );
};
