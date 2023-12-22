import React, { useMemo } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { ProductCardType } from '../types/ProductCardType';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  productsInCart: ProductCardType[];
  setProductsInCart: (value: ProductCardType[]) => void;
};

export const CartContext = React.createContext<ContextType>({
  productsInCart: [],
  setProductsInCart: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [storedProductsInCart] = useLocalStorage('cart', []);

  // Ensure that the stored value is of type ProductCardType[]
  const initialProductsInCart: ProductCardType[]
  = Array.isArray(storedProductsInCart)
    ? storedProductsInCart
    : [];

  const [productsInCart, setProductsInCart]
  = React.useState<ProductCardType[]>(initialProductsInCart);

  const value = useMemo(() => (
    { productsInCart, setProductsInCart }
  ), [productsInCart, setProductsInCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
