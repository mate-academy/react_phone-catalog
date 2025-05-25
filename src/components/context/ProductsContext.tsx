import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { LocalKeys, setLocalStorage } from '../../utils/localStorage';

type Props = {
  children: React.ReactNode;
};

export interface CartProduct {
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
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

const initialState: State = {
  favourites: [],
  addToFav: () => {},
  cartProducts: [],
  addToCart: () => {},
  deleteFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
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
      const newFavs = favourites.filter(pr => pr.id !== favourite.id);

      setFavourites(newFavs);
      setLocalStorage(LocalKeys.Favs, JSON.stringify(newFavs));

      return;
    }

    setFavourites(prev => {
      const newFavs = [...prev, favourite];

      setLocalStorage(LocalKeys.Favs, JSON.stringify(newFavs));

      return newFavs;
    });
  };

  const addToCart = (productToAdd: Product) => {
    setCartProducts(prev => {
      const newCartProducts = [
        ...prev,
        { id: productToAdd.id, quantity: 1, product: productToAdd },
      ];

      setLocalStorage(LocalKeys.Cart, JSON.stringify(newCartProducts));

      return newCartProducts;
    });
  };

  const deleteFromCart = (id: number) => {
    const newCartProducts = cartProducts.filter(pr => pr.id !== id);

    setCartProducts(newCartProducts);
    setLocalStorage(LocalKeys.Cart, JSON.stringify(newCartProducts));

    return newCartProducts;
  };

  const increaseQuantity = (id: number) => {
    setCartProducts(prev => {
      const newCartItems = prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      setLocalStorage(LocalKeys.Cart, JSON.stringify(newCartItems));

      return newCartItems;
    });
  };

  const decreaseQuantity = (id: number) => {
    const product = cartProducts.find(item => item.id === id);
    const newQuantity = (product?.quantity || 1) - 1;

    if (newQuantity < 1) {
      deleteFromCart(product?.id as number);

      return;
    }

    setCartProducts(prev => {
      const newCartItems = prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });

      setLocalStorage(LocalKeys.Cart, JSON.stringify(newCartItems));

      return newCartItems;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    setLocalStorage(LocalKeys.Cart, JSON.stringify([]));
  };

  const value: State = {
    favourites,
    addToFav,
    cartProducts,
    addToCart,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  useEffect(() => {
    const cart = localStorage.getItem(LocalKeys.Cart);
    const favs = localStorage.getItem(LocalKeys.Favs);

    if (cart) {
      setCartProducts(JSON.parse(cart));
    }

    if (favs) {
      setFavourites(JSON.parse(favs));
    }
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
