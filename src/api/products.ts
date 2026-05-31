import { Product, ProductCategory, SortKey } from '../types';

const BASE = `${import.meta.env.BASE_URL}api`;

const CATEGORY_PATH: Record<ProductCategory, string> = {
  phones: `${BASE}/phones.json`,
  tablets: `${BASE}/tablets.json`,
  accessories: `${BASE}/accessories.json`,
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export const fetchProductsByCategory = async (
  category: ProductCategory,
): Promise<Product[]> => {
  return fetchJson<Product[]>(CATEGORY_PATH[category]);
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const [phones, tablets, accessories] = await Promise.all(
    Object.values(CATEGORY_PATH).map(path => fetchJson<Product[]>(path)),
  );

  return [...phones, ...tablets, ...accessories];
};

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  const products = await fetchAllProducts();

  return products.find(product => product.id === id);
};

export const getSuggestedProducts = async (
  productId: string,
  count = 4,
): Promise<Product[]> => {
  const products = await fetchAllProducts();
  const base = products.find(item => item.id === productId);
  const candidates = products.filter(product => product.id !== productId);
  const shuffled = candidates.sort(() => Math.random() - 0.5);

  if (base) {
    const sameCategory = shuffled.filter(
      product => product.category === base.category,
    );

    return sameCategory.slice(0, count).length >= count
      ? sameCategory.slice(0, count)
      : shuffled.slice(0, count);
  }

  return shuffled.slice(0, count);
};

export const getCategoryTitle = (category: ProductCategory): string => {
  if (category === 'phones') {
    return 'Phones';
  }

  if (category === 'tablets') {
    return 'Tablets';
  }

  return 'Accessories';
};

export const sortProducts = (products: Product[], sort: SortKey): Product[] => {
  if (sort === 'age') {
    return [...products].sort((a, b) => {
      const yearA = Number(a.namespaceId.match(/\d{4}/)?.[0] ?? 0);
      const yearB = Number(b.namespaceId.match(/\d{4}/)?.[0] ?? 0);

      return yearB - yearA;
    });
  }

  if (sort === 'title') {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }

  return [...products].sort((a, b) => a.priceDiscount - b.priceDiscount);
};

export const filterProducts = (
  products: Product[],
  query: string,
): Product[] => {
  if (!query.trim()) {
    return products;
  }

  const normalized = query.trim().toLowerCase();

  return products.filter(product =>
    product.name.toLowerCase().includes(normalized),
  );
};
