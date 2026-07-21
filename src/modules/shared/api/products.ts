import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { buildUrl } from '../utils/buildUrl';

const categoryFileMap: Record<string, string> = {
  phones: 'api/phones.json',
  tablets: 'api/tablets.json',
  accessories: 'api/accessories.json',
};

export const getProductDetails = async (
  itemId: string,
): Promise<{ details: ProductDetails; numericId: number } | null> => {
  const productsResponse = await fetch(buildUrl('api/products.json'));

  if (!productsResponse.ok) {
    throw new Error('Failed to fetch products');
  }

  const allProducts: Product[] = await productsResponse.json();
  const shortProduct = allProducts.find(product => product.itemId === itemId);

  if (!shortProduct) {
    return null;
  }

  const detailsFile = categoryFileMap[shortProduct.category];

  if (!detailsFile) {
    return null;
  }

  const detailsResponse = await fetch(buildUrl(detailsFile));

  if (!detailsResponse.ok) {
    throw new Error('Failed to fetch product details');
  }

  const categoryProducts: ProductDetails[] = await detailsResponse.json();
  const details = categoryProducts.find(product => product.id === itemId);

  if (!details) {
    return null;
  }

  return { details, numericId: shortProduct.id };
};

export const getSuggestedProducts = async (
  category: string,
  excludeId: number,
): Promise<Product[]> => {
  const response = await fetch(buildUrl('api/products.json'));

  if (!response.ok) {
    throw new Error('Failed to fetch suggested products');
  }

  const allProducts: Product[] = await response.json();

  const sameCategory = allProducts.filter(
    product => product.category === category && product.id !== excludeId,
  );

  const shuffled = [...sameCategory].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 10);
};
