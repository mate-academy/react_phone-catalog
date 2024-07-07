import { getData } from './fetchClient';
import { ProductDetails } from '../types/ProductDetails';

export const getProductDetails = async (
  id: string,
  category = 'products',
): Promise<ProductDetails | null> => {
  const productsByCategory: ProductDetails[] = await getData<ProductDetails[]>(
    `api/${category}.json`,
  );

  const productWithDetails = productsByCategory.find(
    product => product.id === id,
  );

  return productWithDetails ?? null;
};

export const fetchByColorAndCapacity = async (
  namespaceId: string,
  category: string,
  capacity: string,
  color: string,
): Promise<string | undefined> => {
  const allOptions = await getData<ProductDetails[]>(`api/${category}.json`);

  const productMatch = allOptions.find(
    product =>
      product.namespaceId === namespaceId &&
      product.capacity === capacity &&
      product.color === color,
  );

  return productMatch ? productMatch.id : undefined;
};
