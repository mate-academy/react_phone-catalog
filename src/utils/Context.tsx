import React from 'react';
import { useLocalStorage } from '../hooks/use-storage';

type CartItem = {
  id: string;
  qty: number;
  color: string;
  capacity: string;
};

type AddToCartPayload = { id: string; color: string; capacity: string };

type AppContextValue = {
  cartItems: CartItem[];
  cartIds: string[];
  addToCart: (payload: AddToCartPayload) => void;
  deleteFromCart: (payload: AddToCartPayload) => void;
  changeQty: (payload: AddToCartPayload, delta: number) => void;
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
};

export const AppContext = React.createContext<AppContextValue | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [wishlistIds, setWishlistIds] = useLocalStorage<string[]>(
    'favorites',
    [],
  );

  const cartIds = Array.from(new Set(cartItems.map(item => item.id)));

  const matchItem = (item: CartItem, payload: AddToCartPayload) =>
    item.id === payload.id &&
    item.color === payload.color &&
    item.capacity === payload.capacity;

  const addToCart = (payload: AddToCartPayload) => {
    if (!payload.id || !payload.color || !payload.capacity) {
      return;
    }

    const existing = cartItems.find(item => matchItem(item, payload));

    let next = cartItems;

    if (existing) {
      next = cartItems.map(item =>
        matchItem(item, payload) ? { ...item, qty: item.qty + 1 } : item,
      );
    } else {
      next = [...cartItems, { ...payload, qty: 1 }];
    }

    setCartItems(next);
  };

  const deleteFromCart = (payload: AddToCartPayload) => {
    setCartItems(cartItems.filter(item => !matchItem(item, payload)));
  };

  const changeQty = (payload: AddToCartPayload, delta: number) => {
    const next = cartItems
      .map(item =>
        matchItem(item, payload) ? { ...item, qty: item.qty + delta } : item,
      )
      .filter(item => item.qty > 0);

    setCartItems(next);
  };

  const toggleWishlist = (wishId: string) => {
    const newArr = wishlistIds.filter(id => id !== wishId);

    if (wishlistIds.includes(wishId)) {
      setWishlistIds(newArr);
    } else {
      setWishlistIds([...wishlistIds, wishId]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        cartIds,
        addToCart,
        deleteFromCart,
        changeQty,
        wishlistIds,
        toggleWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
