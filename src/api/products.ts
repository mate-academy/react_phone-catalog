import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const normalizePath = (path: string) => {
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
  try {
    const url = normalizePath('/api/products.json');
    const response = await fetch(url);

    if (!response.ok) {
      return [];
    }

    const products: Product[] = await response.json();

    return products.map(p => ({
      ...p,
      image: normalizePath(p.image),
    }));
  } catch {
    return [];
  }
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails | null> => {
  try {
    const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
      fetch(normalizePath('/api/phones.json')),
      fetch(normalizePath('/api/tablets.json')),
      fetch(normalizePath('/api/accessories.json')),
    ]);

    const phones: ProductDetails[] = phonesRes.ok ? await phonesRes.json() : [];
    const tablets: ProductDetails[] = tabletsRes.ok
      ? await tabletsRes.json()
      : [];
    const accessories: ProductDetails[] = accessoriesRes.ok
      ? await accessoriesRes.json()
      : [];

    const allDetails = [...phones, ...tablets, ...accessories];
    const found = allDetails.find(product => product.id === productId);

    if (!found) {
      return null;
    }

    return {
      ...found,
      images: found.images.map(normalizePath),
    };
  } catch {
    return null;
  }
};
