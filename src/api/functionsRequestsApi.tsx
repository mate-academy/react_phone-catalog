import { Product } from '../types/Product';
import { ProductCompleted } from '../types/ProductCompleted';
import { client } from './httpClient';

export function getProducts() {
  return client.get<Product[]>('/products.json');
}

export async function getProductDetails(productId: string) {
  const products = await getProducts();
  const product = products.find(nowProduct => nowProduct.itemId === productId);

  if (product) {
    const productsCategory = await client.get<ProductCompleted[]>(
      `/${product.category}.json`,
    );
    const rightProduct = productsCategory.find(
      nowProduct => nowProduct.id === productId,
    );

    if (rightProduct) {
      return rightProduct;
    } else {
      throw new Error(`Product with id ${productId} not found`);
    }
  } else {
    throw new Error(`Product with id ${productId} not found`);
  }
}
