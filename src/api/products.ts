import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const normalizePath = (path: string): string => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';

  if (path.startsWith(baseUrl)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${cleanBase}${cleanPath}`;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(normalizePath('/api/products.json'));

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const products: Product[] = await response.json();

  return products.map(product => ({
    ...product,
    image: normalizePath(product.image),
  }));
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails | null> => {
  const responses = await Promise.all([
    fetch(normalizePath('/api/phones.json')),
    fetch(normalizePath('/api/tablets.json')),
    fetch(normalizePath('/api/accessories.json')),
  ]);

  if (responses.some(response => !response.ok)) {
    throw new Error('Failed to load product details');
  }

  const [phones, tablets, accessories] = await Promise.all(
    responses.map(response => response.json()),
  );

  const allDetails: ProductDetails[] = [...phones, ...tablets, ...accessories];

  const found = allDetails.find(product => product.id === productId);

  if (!found) {
    return null;
  }

  return {
    ...found,
    images: found.images.map(normalizePath),
  };
};

export const getSuggestedProducts = async (
  currentProductId: string,
): Promise<Product[]> => {
  const products = await getProducts();

  const availableProducts = products.filter(
    product =>
      product.itemId !== currentProductId &&
      String(product.id) !== currentProductId,
  );

  const shuffled = [...availableProducts].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 4);
};
