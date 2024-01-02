import React, { useState, useMemo, useCallback } from 'react';
import { Product } from './Type/Product';
import { Context } from './Type/Context';
import { Cart } from './Type/Cart';
import { useLocalSrorage } from './hoocks/useLocalStorage';

export const ProductContext = React.createContext<Context>({
  products: [],
  setProducts: () => { },
  phones: [],
  setPhones: () => { },
  tablets: [],
  setTablets: () => { },
  accessories: [],
  setAccessories: () => { },
  filterdProducts: [],
  setFilterdProducts: () => {},
  query: '',
  setQuery: () => { },
  cartItems: [],
  favourites: [],
  hasItems: () => false,
  addCart: () => { },
  deleteCart: () => { },
  plusQuantity: () => { },
  minusQuantity: () => { },
  addFavourites: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterdProducts, setFilterdProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');

  const [cartItems, setCartItems] = useLocalSrorage<Cart[]>('cartItems', []);
  const [favourites, setFavourites] = useLocalSrorage<Product[]>(
    'favourites', [],
  );

  const hasItems = useCallback(
    (prodId: number, product: (Product | Cart)[]): boolean => {
      return product.some((item): item is Product => {
        return 'id' in item && +item.id === +prodId;
      });
    }, [],
  );

  const addCart = useCallback((id: number, product: Product) => {
    if (hasItems(+id, cartItems)) {
      setCartItems(cartItems.filter((c => c.id !== +id)));
    } else {
      const newCart = {
        id: +id,
        quantity: 1,
        product,
      };

      setCartItems([...cartItems, newCart]);
    }
  }, [hasItems, cartItems, setCartItems]);

  const deleteCart = useCallback((cartId: number) => {
    setCartItems(cartItems.filter((c => c.id !== cartId)));
  }, [cartItems, setCartItems]);

  const plusQuantity = useCallback((cartId: number, quantity: number) => {
    setCartItems(cartItems.map((someCart) => {
      if (someCart.id === cartId) {
        return {
          ...someCart,
          quantity: quantity + 1,
        };
      }

      return someCart;
    }));
  }, [cartItems, setCartItems]);

  const minusQuantity = useCallback((cartId: number, quantity: number) => {
    setCartItems(cartItems.map((someCart) => {
      if (someCart.id === cartId) {
        return {
          ...someCart,
          quantity: quantity - 1,
        };
      }

      return someCart;
    }));
  }, [cartItems, setCartItems]);

  const addFavourites = useCallback((cartId: number, product: Product) => {
    if (hasItems(+cartId, favourites)) {
      setFavourites(favourites.filter((c => +c.id !== cartId)));
    } else {
      setFavourites([...favourites, product]);
    }
  }, [hasItems, favourites, setFavourites]);

  const value = useMemo(() => ({
    products,
    setProducts,
    phones,
    setPhones,
    tablets,
    setTablets,
    accessories,
    filterdProducts,
    setFilterdProducts,
    query,
    setQuery,
    setAccessories,
    cartItems,
    favourites,
    hasItems,
    addCart,
    deleteCart,
    plusQuantity,
    minusQuantity,
    addFavourites,
  }), [
    products,
    phones,
    tablets,
    accessories,
    filterdProducts,
    query,
    cartItems,
    favourites,
    hasItems,
    addCart,
    deleteCart,
    plusQuantity,
    minusQuantity,
    addFavourites,
  ]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
