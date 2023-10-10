import { useEffect } from 'react';
import { Product } from '../types/Product';

export const useToggle = (
  nameProd: string,
  products: Product[],
  setProducts: (newProducts: Product[]) => void,
  carrProduct: Product,
): [boolean, (
  ) => void] => {
  const isSelected = products.some((prod) => prod.id === carrProduct.id);

  useEffect(() => {
    localStorage.setItem(nameProd, JSON.stringify(products));
  }, [products]);

  const toggler = () => {
    if (isSelected) {
      setProducts(products.filter((prod) => prod.id !== carrProduct.id));
    } else {
      setProducts([...products, carrProduct]);
    }
  };

  return [isSelected, toggler];
};
