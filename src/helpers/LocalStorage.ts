import { useState } from 'react';
import { Product } from './types/Product';
import { ProductInCart } from './types/ProductInCart';

type LocalStorageItem = Product | ProductInCart;

export function useLocalStorage(key: string): [
  () => LocalStorageItem[],
  (newProducts: LocalStorageItem[]) => void,
  (productId: string) => boolean,
  number,
  number,
] {
  const getProducts = () => {
    const savedProducts = localStorage.getItem(key);

    return typeof savedProducts === 'string' ? JSON.parse(savedProducts) : [];
  };

  const [products, setProducts] = useState<LocalStorageItem[]>(getProducts);

  const saveProducts = (newProducts: LocalStorageItem[]) => {
    setProducts(newProducts);
    localStorage.setItem(key, JSON.stringify(newProducts));
  };

  const contains = (productId: string) => products.some(storageProduct => {
    return 'id' in storageProduct
      ? storageProduct.id === productId
      : storageProduct.product.id === productId;
  });

  const cartTotalSize = products.reduce((total, current) => {
    const { quantity } = current as ProductInCart;

    return total + quantity;
  }, 0);

  return [getProducts, saveProducts, contains, products.length, cartTotalSize];
}
