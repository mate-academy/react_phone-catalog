import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/fetch';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>('products.json');
};

// export const getProductById = (productId: string): Promise<ProductDetails> => {
//   return client.get<ProductDetails>(`products/${productId}.json`);
// };

// eslint-disable-next-line prettier/prettier
export const getProductById = async (
  productId: string,
): Promise<ProductDetails> => {
  const categories = ['phones', 'tablets', 'accessories'];

  for (const category of categories) {
    try {
      const products = await client.get<ProductDetails[]>(`${category}.json`);
      const product = products.find(p => p.id === productId);

      if (product) {
        return product;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error fetching products from ${category}.json:`, error);
    }
  }

  throw new Error(`Product with id ${productId} not found`);
};
