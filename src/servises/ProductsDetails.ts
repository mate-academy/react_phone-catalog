import { ProductDetails } from '../types/ProductDetails';
import { getData } from '../utils/httpClient';

export const getProductDetails = async (
  itemId: string,
  category = 'products',
): Promise<ProductDetails | null> => {
  const categoryProducts: ProductDetails[] = await getData<ProductDetails[]>(
    `/api/${category}.json`,
  );
  const detailedProduct = categoryProducts.find(p => p.id === itemId);

  return detailedProduct ?? null;
};

export const fetchProductByColorAndCapacity = async (
  category: string,
  namespaceId: string,
  color: string,
  capacity: string,
): Promise<string | undefined> => {
  const allVariants = await getData<ProductDetails[]>(`/api/${category}.json`);

  const matchedProduct = allVariants.find(
    p =>
      p.namespaceId === namespaceId &&
      p.color === color &&
      p.capacity === capacity,
  );

  return matchedProduct ? matchedProduct.id : undefined;
};
