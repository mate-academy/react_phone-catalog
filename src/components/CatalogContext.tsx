import React, { useMemo, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../helper/Cart';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export type ContextType = {
  cartItems: CartItem[];
  setCartItems: (value: CartItem[]) => void;
  favoriteProducts: Product[];
  setFavoriteProducts: (value: Product[]) => void;
  product: ProductDetails | null;
  setProduct: (value: ProductDetails) => void;
  productNotFound: boolean;
  setProductNotFound: (value: boolean) => void;
  productDetailsLoading: boolean;
  setProductDetailsLoading: (value: boolean) => void;
};

export const CatalogContext = React.createContext<ContextType>({
  cartItems: [],
  setCartItems: () => {},
  favoriteProducts: [],
  setFavoriteProducts: () => {},
  product: null,
  setProduct: () => {},
  productNotFound: false,
  setProductNotFound: () => {},
  productDetailsLoading: false,
  setProductDetailsLoading: () => {},
});

export type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'cartItems',
    [],
  );

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [productNotFound, setProductNotFound] = useState(false);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);

  const values = useMemo(
    () => ({
      cartItems,
      setCartItems,
      favoriteProducts,
      setFavoriteProducts,
      product,
      setProduct,
      productNotFound,
      setProductNotFound,
      productDetailsLoading,
      setProductDetailsLoading,
    }),
    [
      cartItems,
      setCartItems,
      favoriteProducts,
      setFavoriteProducts,
      product,
      setProduct,
      productNotFound,
      setProductNotFound,
      productDetailsLoading,
      setProductDetailsLoading,
    ],
  );

  return (
    <CatalogContext.Provider value={values}>{children}</CatalogContext.Provider>
  );
};
