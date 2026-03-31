import { ProductDetails } from '@/features/products/types/productDetails';
// import { delayOnPurpose } from './delayOnPurpose';

export const fetchProductByItemId = async (
  itemId: string,
  category: string,
): Promise<ProductDetails> => {
  const response = await fetch(`api/${category}.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const data: ProductDetails[] = await response.json();
  const product = data.find(p => p.id === itemId);

  if (!product) {
    throw new Error('Product not found');
  }

  // await delayOnPurpose(1000);

  return product;
};
