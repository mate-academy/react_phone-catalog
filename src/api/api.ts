import { Product } from '@/types/Product';
import { ProductDetails } from '@/types/ProductDetails';


export type TCategory = 'tablets' | 'phones' | 'accesories';

export async function getData<T>(path: string): Promise<T> {
  const response = await fetch(`${window.location.origin}/${path}`);

  if (!response.ok) {
    throw new Error('Can`t get data from the server');
  }

  return response.json();
}

export const getProducts = () => {
  return getData<Product[]>('api/products.json');
};

export const getProductDetails = async ({
  category,
  productId,
}: {
  category: TCategory;
  productId: string;
}) => {
  const data = await getData<ProductDetails[]>(`api/${category}.json`);

  return data.find(product => product.id === productId);
};
