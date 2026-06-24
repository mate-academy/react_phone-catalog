import type { Product, ProductCategory } from '../types/product';
import type { ProductDetails } from '../types/productDetails';
import {
  detailsImagesOverrides,
  productImageOverrides,
} from '../config/imageOverrides';

const BASE_URL = `${import.meta.env.BASE_URL}api`;

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to load data: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
};

export const getProducts = async (): Promise<Product[]> => {
  const products = await fetchJson<Product[]>(`${BASE_URL}/products.json`);

  return products.map(product => ({
    ...product,
    image: productImageOverrides[product.itemId] ?? product.image,
  }));
};

export const getProductDetails = async (
  category: ProductCategory,
  productId: string,
): Promise<ProductDetails | null> => {
  const items = await fetchJson<ProductDetails[]>(
    `${BASE_URL}/${category}.json`,
  );
  const details = items.find(item => item.id === productId);

  if (!details) {
    return null;
  }

  return {
    ...details,
    images: detailsImagesOverrides[details.id] ?? details.images,
  };
};

export const getCategoryProductDetails = (
  category: ProductCategory,
): Promise<ProductDetails[]> =>
  fetchJson<ProductDetails[]>(`${BASE_URL}/${category}.json`);

export const getSuggestedProducts = async (
  currentId: string,
  category: ProductCategory,
  limit = 12,
): Promise<Product[]> => {
  const products = await getProducts();

  const pool = products.filter(
    p => p.category === category && p.itemId !== currentId,
  );

  const shuffled = [...pool];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, limit);
};
