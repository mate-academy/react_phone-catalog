import { ProductDetailsType } from '../types/product-details.types';
import { client } from './client';

const BASE = import.meta.env.BASE_URL;

const CATEGORY_MAP: Record<string, string> = {
  accessories: `${BASE}api/accessories.json`,
  phones: `${BASE}api/phones.json`,
  tablets: `${BASE}api/tablets.json`,
};

const categoryCache: Record<string, ProductDetailsType[]> = {};

const loadCategory = async (
  category: string,
): Promise<ProductDetailsType[]> => {
  const url = CATEGORY_MAP[category.toLowerCase()];

  if (!url) {
    return [];
  }

  if (categoryCache[category]) {
    return categoryCache[category];
  }

  const controller = new AbortController();

  try {
    const data = await client<ProductDetailsType[]>(url, controller.signal);

    categoryCache[category] = data;

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      return [];
    }

    throw error;
  }
};

export const getProducts = async (
  category?: string,
): Promise<ProductDetailsType[]> => {
  if (!category) {
    const allResult = await Promise.all(
      Object.keys(CATEGORY_MAP).map(cat => loadCategory(cat)),
    );

    return allResult.flat();
  }

  return loadCategory(category);
};

export const getProductDetails = async (
  itemId: string,
  categoryHint?: string,
): Promise<ProductDetailsType> => {
  let products: ProductDetailsType[];

  if (categoryHint) {
    products = await loadCategory(categoryHint);
  } else {
    products = await getProducts();
  }

  const foundProduct = products.find(
    product => product.namespaceId === itemId || product.id === itemId,
  );

  if (!foundProduct) {
    throw new Error(`Product with ID ${itemId} not found`);
  }

  return foundProduct;
};
