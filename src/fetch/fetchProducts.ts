import { Product } from '../types/ProductInfo';
import { client } from '../fetch/fetch';

export const getProductsByCategory = (category: string) => {
  switch (category) {
    case 'phones':
      return client.fetchIPhones();
    case 'tablets':
      return client.fetchTablets();
    case 'accessories':
      return client.fetchAccessories();
    default:
      return Promise.resolve([]);
  }
};

export const getProductById = async (
  productId: string,
): Promise<Product | undefined> => {
  try {
    const categories = ['phones', 'tablets', 'accessories'];

    for (const category of categories) {
      const products = await getProductsByCategory(category);
      const foundProduct = products.find(
        (product: Product) => product.id === productId,
      );

      if (foundProduct) {
        return foundProduct;
      }
    }

    return undefined;
  } catch (error) {
    console.error('Error in getProductById:', error);
    return undefined;
  }
};
