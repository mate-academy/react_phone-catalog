import { ProductDetailBase } from './types';

export async function getProductById(
  productId: string,
): Promise<ProductDetailBase | null> {
  const [phones, tablets, accessories] = await Promise.all([
    fetch('/api/phones.json').then(res => res.json()),
    fetch('/api/tablets.json').then(res => res.json()),
    fetch('/api/accessories.json').then(res => res.json()),
  ]);

  const allProducts = [
    ...phones,
    ...tablets,
    ...accessories,
  ] as ProductDetailBase[];

  return allProducts.find(product => product.id === productId) || null;
}
