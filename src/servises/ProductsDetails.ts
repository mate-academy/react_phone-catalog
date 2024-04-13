import { ProductDetails } from '../types/ProductDetails';
import { getData } from '../utils/httpClient';

export const getPhoneDetails = async (
  itemId: string,
  category: string,
): Promise<ProductDetails | undefined> => {
  const products: ProductDetails[] = await getData<ProductDetails[]>(
    `/api/${category}.json`,
  );
  const product: ProductDetails | undefined = products.find(
    p => p.id === itemId,
  );

  return product;
};
