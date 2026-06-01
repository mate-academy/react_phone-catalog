import { Category, Product } from '../types';
import { getAssetPath } from '../utils/assets';

const categoryFiles: Record<Category, string> = {
  phones: getAssetPath('api/phones.json'),
  tablets: getAssetPath('api/tablets.json'),
  accessories: getAssetPath('api/accessories.json'),
};

const listFile = getAssetPath('api/products.json');

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json();
}

function normalizeAssetPath(path = '') {
  if (!path || path.startsWith('http')) {
    return path;
  }

  return getAssetPath(path);
}

function normalizeProductImages(product: Product): Product {
  return {
    ...product,
    image: normalizeAssetPath(product.image),
    images: product.images?.map(normalizeAssetPath),
  };
}

export async function fetchListProducts(): Promise<Product[]> {
  const products = await fetchJson<Product[]>(listFile);

  return products.map(normalizeProductImages);
}

export async function fetchListProductsByCategory(
  category: Category,
): Promise<Product[]> {
  const products = await fetchListProducts();

  return products.filter(product => product.category === category);
}

export async function fetchProductDetails(
  productId: string,
): Promise<Product | undefined> {
  const allDetails = await Promise.all(
    Object.values(categoryFiles).map(path => fetchJson<Product[]>(path)),
  );

  const product = allDetails
    .flat()
    .find(item => item.id === productId || item.itemId === productId);

  return product ? normalizeProductImages(product) : undefined;
}

export async function getSuggestedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  const allProducts = await fetchListProducts();
  const candidates = allProducts.filter(
    product => product.itemId !== productId && product.id !== productId,
  );
  const shuffled = candidates.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, Math.min(limit, shuffled.length));
}

export function sortProducts(
  products: Product[],
  sortOrder: string,
): Product[] {
  if (sortOrder === 'age') {
    return [...products].sort((a, b) => {
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;

      return yearB - yearA;
    });
  }

  if (sortOrder === 'title') {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOrder === 'price') {
    return [...products].sort((a, b) => {
      const priceA = a.price ?? a.priceDiscount ?? a.priceRegular ?? 0;
      const priceB = b.price ?? b.priceDiscount ?? b.priceRegular ?? 0;

      return priceA - priceB;
    });
  }

  return products;
}

export function filterProductsByQuery(
  products: Product[],
  query: string,
): Product[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return products;
  }

  return products.filter(item => {
    const searchable = [item.name, item.color, item.capacity, item.category]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return words.every(word => searchable.includes(word));
  });
}

export function getHotProducts(products: Product[], limit = 6): Product[] {
  return [...products]
    .sort((a, b) => {
      const discountA =
        (a.fullPrice ?? a.priceRegular ?? 0) -
        (a.price ?? a.priceDiscount ?? 0);
      const discountB =
        (b.fullPrice ?? b.priceRegular ?? 0) -
        (b.price ?? b.priceDiscount ?? 0);

      return discountB - discountA;
    })
    .slice(0, limit);
}

export function getNewestProducts(products: Product[], limit = 6): Product[] {
  return [...products]
    .sort((a, b) => {
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;

      return yearB - yearA;
    })
    .slice(0, limit);
}

export function getShopByCategory(): Array<{
  label: string;
  path: string;
  category: Category;
}> {
  return [
    { label: 'Mobile phones', path: '/phones', category: 'phones' },
    { label: 'Tablets', path: '/tablets', category: 'tablets' },
    { label: 'Accessories', path: '/accessories', category: 'accessories' },
  ];
}
