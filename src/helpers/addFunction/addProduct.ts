/* eslint-disable react-hooks/rules-of-hooks */
import { Product } from '../../types/Product';

export const addProduct = <T extends Product>(
  product: T,
  products: T[],
  setProducts: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  if (!products.find(productCurrent => (
    productCurrent.itemId === product.itemId
  ))) {
    setProducts([...products, product]);
  } else {
    const newCarts = products
      .filter(productCurrent => productCurrent.itemId !== product.itemId);

    setProducts(newCarts);
  }
};
