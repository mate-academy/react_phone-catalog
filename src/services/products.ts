import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { Category } from '../types/Category';

const API_URL = `${import.meta.env.BASE_URL}api/`;

let productsCache: Promise<Product[]> | null = null;

let cachedProducts: Product[] | null = null;

export const getCachedProducts = (): Product[] | null => {
  return cachedProducts;
};

const categoryCache: Partial<Record<Category, Promise<ProductDetails[]>>> = {};

async function loadJSON<T>(filename: string): Promise<T> {
  const response = await fetch(`${API_URL}${filename}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${filename}`);
  }

  return response.json() as Promise<T>;
}

export const getProducts = (): Promise<Product[]> => {
  if (cachedProducts) {
    return Promise.resolve(cachedProducts);
  }

  if (!productsCache) {
    productsCache = loadJSON<Product[]>('products.json')
      .then(products => {
        cachedProducts = products;

        return products;
      })
      .catch(error => {
        productsCache = null;

        throw error;
      });
  }

  return productsCache;
};

export const getCategoryProducts = async (
  category: Category,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getCategoryDetails = (
  category: Category,
): Promise<ProductDetails[]> => {
  if (!categoryCache[category]) {
    categoryCache[category] = loadJSON<ProductDetails[]>(
      `${category}.json`,
    ).catch(error => {
      delete categoryCache[category];

      throw error;
    });
  }

  return categoryCache[category];
};

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails | null> => {
  const products = await getProducts();

  const product = products.find(item => item.itemId === productId);

  if (!product) {
    return null;
  }

  const category = product.category as Category;

  const details = await getCategoryDetails(category);

  return details.find(item => item.id === productId) ?? null;
};

export const getSuggestedProducts = async (
  excludeId?: string,
): Promise<Product[]> => {
  const products = await getProducts();

  const availableProducts = products.filter(
    product => product.itemId !== excludeId,
  );

  const shuffledProducts = [...availableProducts];

  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffledProducts[i], shuffledProducts[randomIndex]] = [
      shuffledProducts[randomIndex],
      shuffledProducts[i],
    ];
  }

  return shuffledProducts.slice(0, 12);
};
