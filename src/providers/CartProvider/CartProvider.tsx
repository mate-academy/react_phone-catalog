import React, { useMemo, useState } from 'react';

import { Product } from '../../types/Product';

type ProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  productsInCart: Product[];
  setProductsInCart: (value: Product[]) => void;
};

export const CartContext = React.createContext<ContextProps>({
  productsInCart: [],
  setProductsInCart: () => {},
});

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  const value = useMemo(() => (
    { productsInCart, setProductsInCart }), [productsInCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
