import React, { useState } from 'react';
import { Product } from '../types/Product';

type Props = {
  children: React.ReactNode;
};

interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}

interface State {
  favourites: Product[];
  addToFav: (product: Product) => void;
  cartProducts: CartProduct[];
  addToCart: (productToAdd: Product) => void;
  deleteFromCart: (id: number) => void;
}

const initialState: State = {
  favourites: [],
  addToFav: () => {},
  cartProducts: [],
  addToCart: () => {},
  deleteFromCart: () => {},
};

export const ProductsContext = React.createContext(initialState);

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useState<Product[]>(
    initialState.favourites,
  );
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(
    initialState.cartProducts,
  );

  const addToFav = (favourite: Product) => {
    if (favourites.some(pr => pr.id === favourite.id)) {
      setFavourites(favourites.filter(pr => pr.id !== favourite.id));

      return;
    }

    setFavourites(prev => [...prev, favourite]);
  };

  const addToCart = (productToAdd: Product) => {
    setCartProducts(prev => [
      ...prev,
      { id: productToAdd.id, quantity: 1, product: productToAdd },
    ]);
  };

  const deleteFromCart = (id: number) => {
    setCartProducts(prev => prev.filter(pr => pr.id !== id));
  };

  const value: State = {
    favourites,
    addToFav,
    cartProducts,
    addToCart,
    deleteFromCart,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
