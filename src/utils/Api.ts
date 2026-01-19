import { Product } from '../types/Product';
import { Item } from '../types/Item';
import { CategoryType, SortOption } from '../types/Product';
/**
 * API Configuration
 */
export const API_BASE_URL = `${import.meta.env.BASE_URL}/api`;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products.json`,
  PHONES: `${API_BASE_URL}/phones.json`,
  TABLETS: `${API_BASE_URL}/tablets.json`,
  ACCESSORIES: `${API_BASE_URL}/accessories.json`,
} as const;

/**
 * Category Configuration
 */
export const CATEGORIES = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
} as const;

/**
 * Sort Options
 */
export const SORT_OPTIONS = {
  NEWEST: 'age',
  ALPHABETICALLY: 'name',
  CHEAPEST: 'price',
} as const;

/**
 * Pagination Configuration
 */
export const ITEMS_PER_PAGE_OPTIONS = [4, 8, 16, 'all'] as const;
export const DEFAULT_ITEMS_PER_PAGE = 16;
export const DEFAULT_PAGE = 1;

/**
 * Delay for simulating network requests (optional)
 */
const NETWORK_DELAY = 300;

/**
 * Helper function to simulate network delay
 */
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

/**
 * Generic fetch function with error handling
 */
async function fetchData<T>(url: string): Promise<T> {
  await wait(NETWORK_DELAY);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Get all products from products.json
 */
export const getProducts = (): Promise<Product[]> => {
  return fetchData<Product[]>(API_ENDPOINTS.PRODUCTS);
};

/**
 * Get all items of a specific category
 */
export const getItemsByCategory = (category: CategoryType): Promise<Item[]> => {
  const endpoint = API_ENDPOINTS[category.toUpperCase() as keyof typeof API_ENDPOINTS];

  return fetchData<Item[]>(endpoint);
};

/**
 * Get all phones
 */
export const getPhones = (): Promise<Item[]> => {
  return fetchData<Item[]>(API_ENDPOINTS.PHONES);
};

/**
 * Get all tablets
 */
export const getTablets = (): Promise<Item[]> => {
  return fetchData<Item[]>(API_ENDPOINTS.TABLETS);
};

/**
 * Get all accessories
 */
export const getAccessories = (): Promise<Item[]> => {
  return fetchData<Item[]>(API_ENDPOINTS.ACCESSORIES);
};

/**
 * Get specific item details by ID and category
 */
export const getItemById = async (itemId: string, category: CategoryType): Promise<Item | null> => {
  const items = await getItemsByCategory(category);

  return items.find(item => item.id === itemId) || null;
};

/**
 * Get products by category from products.json
 */
export const getProductsByCategory = async (category: CategoryType): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

/**
 * Get hot price products (products with biggest discounts)
 */
export const getHotPriceProducts = async (limit: number = 12): Promise<Product[]> => {
  const products = await getProducts();

  return products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, limit);
};

/**
 * Get brand new products (newest by year)
 */
export const getBrandNewProducts = async (limit: number = 12): Promise<Product[]> => {
  const products = await getProducts();

  return products.sort((a, b) => b.year - a.year).slice(0, limit);
};

/**
 * Get suggested products (random products excluding current)
 */
export const getSuggestedProducts = async (currentProductId: string, limit: number = 12): Promise<Product[]> => {
  const products = await getProducts();
  const filteredProducts = products.filter(p => p.id !== currentProductId);

  // Shuffle and take random products
  const shuffled = [...filteredProducts].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, limit);
};

/**
 * Get count of products by category
 */
export const getCategoryCount = async (category: CategoryType): Promise<number> => {
  const products = await getProductsByCategory(category);

  return products.length;
};

/**
 * Get all category counts
 */
export const getAllCategoryCounts = async (): Promise<{
  phones: number;
  tablets: number;
  accessories: number;
}> => {
  const products = await getProducts();

  return {
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  };
};

/**
 * Sort products based on sort option
 */
export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'age':
      return sorted.sort((a, b) => b.year - a.year);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
};

/**
 * Filter products by search query
 */
export const filterProducts = (products: Product[], query: string): Product[] => {
  if (!query.trim()) {
    return products;
  }

  const lowerQuery = query.toLowerCase();

  return products.filter(product => product.name.toLowerCase().includes(lowerQuery));
};

/**
 * Paginate products
 */
export const paginateProducts = (products: Product[], page: number, perPage: number | 'all'): Product[] => {
  if (perPage === 'all') {
    return products;
  }

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return products.slice(startIndex, endIndex);
};

/**
 * Calculate total pages
 */
export const getTotalPages = (totalItems: number, perPage: number | 'all'): number => {
  if (perPage === 'all') {
    return 1;
  }

  return Math.ceil(totalItems / perPage);
};
