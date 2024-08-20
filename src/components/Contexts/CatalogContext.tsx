import React, { useEffect, useState } from 'react';

import { Product } from '../../types/Product';
import allProducts from '../../api/products.json';
import { CartProducts } from '../../types/CartProducts';

type Context = {
  aside: boolean;
  setAside: (flag: boolean) => void;
  closeAsideAndGoTop: (flag: boolean) => void;
  allProducts: Product[];
  popup: string;
  setPopup: (message: string) => void;
  favourites: Product[];
  addFavourites: (product: Product) => void;
  deleteFromFavourites: (product: Product) => void;
  cart: CartProducts[];
  addCart: (product: CartProducts) => void;
  deleteFromCart: (productId: number) => void;
  clearCart: () => void;
  changeCountProduct: (productId: number, count: number) => void;
};

export const CatalogContext = React.createContext<Context>({
  aside: false,
  setAside: () => {},
  closeAsideAndGoTop: () => {},
  allProducts: [],
  popup: '',
  setPopup: () => {},
  favourites: [],
  addFavourites: () => {},
  deleteFromFavourites: () => {},
  cart: [],
  addCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
  changeCountProduct: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [aside, setAside] = useState(false);
  const [popup, setPopup] = useState('');
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartProducts[]>([]);

  const closeAsideAndGoTop = (flag: boolean) => {
    if (flag) {
      window.scrollTo(0, 0);
    }

    setAside(false);
  };

  const addFavourites = (newProduct: Product) => {
    setFavourites(currentProducts => [...currentProducts, newProduct]);
  };

  const addCart = (newProduct: CartProducts) => {
    setCart(currentCart => [...currentCart, newProduct]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const changeCountProduct = (cartProductId: number, count: number) => {
    setCart(currentCart => {
      const updatedCart = currentCart.map(product => {
        if (product.id === cartProductId) {
          const newCount = product.quantity + count;

          return { ...product, quantity: newCount > 0 ? newCount : 1 };
        }

        return product;
      });

      return updatedCart;
    });
  };

  const deleteFromCart = (currentProductId: number) => {
    setCart(currentCart =>
      currentCart.filter(pack => pack.id !== currentProductId),
    );
  };

  const deleteFromFavourites = (currentProduct: Product) => {
    setFavourites(currentProducts =>
      currentProducts.filter(product => product !== currentProduct),
    );
  };

  useEffect(() => {
    const storedFavourite = localStorage.getItem('favourites');
    const storedCart = localStorage.getItem('cart');

    if (storedFavourite) {
      setFavourites(JSON.parse(storedFavourite));
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const objectContext = {
    aside,
    setAside,
    closeAsideAndGoTop,
    allProducts,
    popup,
    setPopup,
    favourites,
    addFavourites,
    deleteFromFavourites,
    cart,
    addCart,
    deleteFromCart,
    clearCart,
    changeCountProduct,
  };

  return (
    <CatalogContext.Provider value={objectContext}>
      {children}
    </CatalogContext.Provider>
  );
};
