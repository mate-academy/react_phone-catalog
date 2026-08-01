import {
  Category,
  Product,
  ProductDetails,
  ProductWithVariants,
} from '@shared/types';

const SUGGESTED_PRODUCTS_COUNT = 12;

const CATEGORIES: Category[] = ['phones', 'tablets', 'accessories'];

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('api/products.json');

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  return response.json();
};

export const getProductsByCategory = async (
  category: Category,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

const getCategoryDetails = async (
  category: Category,
): Promise<ProductDetails[]> => {
  const response = await fetch(`api/${category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load ${category}: ${response.status}`);
  }

  return response.json();
};

const getAllDetails = async (): Promise<ProductDetails[]> => {
  const detailsByCategory = await Promise.all(
    CATEGORIES.map(category => getCategoryDetails(category)),
  );

  return detailsByCategory.flat();
};

/**
 * Returns `null` when there is no product with the given id, so the page can
 * tell an unknown product from a failed request.
 */
export const getProductDetails = async (
  itemId: string,
): Promise<ProductWithVariants | null> => {
  const [products, allDetails] = await Promise.all([
    getProducts(),
    getAllDetails(),
  ]);

  // `apple-iphone-14-pro-512gb` is listed under two slightly different ids in
  // products.json and phones.json, so fall back to matching it by name.
  const productById = products.find(item => item.itemId === itemId);
  const details =
    allDetails.find(item => item.id === itemId) ??
    allDetails.find(item => item.name === productById?.name);

  if (!details) {
    return null;
  }

  const product =
    productById ?? products.find(item => item.name === details.name);

  return {
    details,
    // Card links and favourites are keyed by the products.json id.
    itemId: product?.itemId ?? details.id,
    card: product ?? null,
    variants: allDetails.filter(
      item => item.namespaceId === details.namespaceId,
    ),
  };
};

const shuffle = <T>(items: T[]): T[] => {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const getSuggestedProducts = async (
  excludedItemId: string,
): Promise<Product[]> => {
  const products = await getProducts();

  return shuffle(
    products.filter(product => product.itemId !== excludedItemId),
  ).slice(0, SUGGESTED_PRODUCTS_COUNT);
};

export const getHotPriceProducts = (products: Product[]): Product[] => {
  return products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
};

export const getBrandNewProducts = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => b.year - a.year || b.price - a.price);
};
