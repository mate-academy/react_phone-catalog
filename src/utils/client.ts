import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

// Relative URLs work with HashRouter and with the gh-pages base path
const API_URL = 'api';

let productsPromise: Promise<Product[]> | null = null;

function get<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  });
}

export const getProducts = (): Promise<Product[]> => {
  if (!productsPromise) {
    productsPromise = get<Product[]>(`${API_URL}/products.json`).catch(
      error => {
        // allow "Reload" to try again
        productsPromise = null;
        throw error;
      },
    );
  }

  return productsPromise;
};

export const getProductsByCategory = (category: Category) =>
  getProducts().then(products =>
    products.filter(product => product.category === category),
  );

const detailsCache: Partial<Record<Category, Promise<ProductDetails[]>>> = {};

const getCategoryDetails = (category: Category): Promise<ProductDetails[]> => {
  if (!detailsCache[category]) {
    detailsCache[category] = get<ProductDetails[]>(
      `${API_URL}/${category}.json`,
    ).catch(error => {
      delete detailsCache[category];

      throw error;
    });
  }

  return detailsCache[category] as Promise<ProductDetails[]>;
};

// The id of a variant is always built from its namespace, capacity and color
// (phones.json has one id that does not follow this rule).
export const getVariantId = (item: ProductDetails) =>
  `${item.namespaceId}-${item.capacity.toLowerCase()}-${item.color.replace(
    ' ',
    '-',
  )}`;

export interface ProductPageData {
  product: Product;
  details: ProductDetails;
  // all the colors and capacities of the same model
  variants: ProductDetails[];
}

// resolves with null when there is no product with the given id
export const getProductPageData = async (
  itemId: string,
): Promise<ProductPageData | null> => {
  const products = await getProducts();
  const product = products.find(item => item.itemId === itemId);

  if (!product) {
    return null;
  }

  const items = await getCategoryDetails(product.category);
  const details = items.find(item => getVariantId(item) === itemId);

  if (!details) {
    return null;
  }

  return {
    product,
    details,
    variants: items.filter(item => item.namespaceId === details.namespaceId),
  };
};

// random products of the same category, except the given ones
export const getSuggestedProducts = async (
  category: Category,
  excludedItemIds: string[],
  count = 10,
): Promise<Product[]> => {
  const products = await getProducts();
  const pool = products.filter(
    product =>
      product.category === category &&
      !excludedItemIds.includes(product.itemId),
  );

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
};
