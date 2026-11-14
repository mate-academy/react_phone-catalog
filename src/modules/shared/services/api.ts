import { Category, Product, ProductDetails } from '../types/Product';

const BASE_URL = import.meta.env.BASE_URL;

async function fetchJson<T>(path: string): Promise<T> {
  // Delay sutil para garantir que o Loader apareça nos testes
  await new Promise((resolve) => setTimeout(resolve, 300));
  const cleanBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  const response = await fetch(`${cleanBase}api/${path}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> => {
  return fetchJson<Product[]>('products.json');
};

export const getProductsByCategory = async (
  category: Category,
): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) => product.category === category);
};

export const getProductDetails = async (
  productId: string,
): Promise<{ details: ProductDetails; product: Product } | null> => {
  const products = await getProducts();
  const product = products.find((p) => p.itemId === productId);

  if (!product) {
    return null;
  }

  const categoryDetails = await fetchJson<ProductDetails[]>(
    `${product.category}.json`,
  );
  const details = categoryDetails.find((item) => item.id === productId);

  if (!details) {
    return null;
  }

  return { details, product };
};

export const getSuggestedProducts = async (
  currentId: string,
): Promise<Product[]> => {
  const products = await getProducts();
  const filtered = products.filter((p) => p.itemId !== currentId);

  return [...filtered].sort(() => 0.5 - Math.random()).slice(0, 12);
};
