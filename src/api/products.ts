import { Product, RawProduct } from '../types/Product';
import { getBaseUrl } from '../utils/BaseUrl';
import { getProductId, normalizeProduct, shuffle } from '../utils/product';

export const getProducts = async () => {
  const response = await fetch(`${getBaseUrl()}api/products.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: RawProduct[] = await response.json();

  return data.map(normalizeProduct);
};

export const getCategoryProducts = async (category: string) => {
  const response = await fetch(`${getBaseUrl()}api/${category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}: ${response.statusText}`);
  }

  const data: RawProduct[] = await response.json();

  return data.map(item => normalizeProduct({ ...item, category }));
};

const categories = ['phones', 'tablets', 'accessories'];

export const getProductDetails = async (productId: string) => {
  const groups = await Promise.all(
    categories.map(category => getCategoryProducts(category)),
  );

  for (const items of groups) {
    const product = items.find(item => getProductId(item) === productId);

    if (product) {
      return { product, variants: items };
    }
  }

  return { product: null, variants: [] as Product[] };
};

export const getSuggestedProducts = async (productId: string, count = 8) => {
  const products = await getProducts();
  const others = products.filter(item => getProductId(item) !== productId);

  return shuffle(others).slice(0, count);
};
