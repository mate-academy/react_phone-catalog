import React, { useEffect } from 'react';
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
  addToFavourites: (product: Product) => void;
  cartProducts: CartProduct[];
  addToCart: (product: Product) => void;
  deleteFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

const initialState: State = {
  favourites: [],
  addToFavourites: () => {},
  cartProducts: [],
  addToCart: () => {},
  deleteFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
};

export const ProductsContext = React.createContext<State>(initialState);

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = React.useState<Product[]>([]);
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);

  const addToFavourites = (favourite: Product) => {
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

  const addToCart = (product: Product) => {
    setCartProducts(prev => {
      const existingProduct = prev.find(item => item.id === product.id);

      if (existingProduct) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { id: product.id, quantity: 1, product }];
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
    <ProductsContext.Provider
      value={{
        favourites,
        addToFavourites,
        cartProducts,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
