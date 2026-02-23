import React from 'react';
import { useLocalStorage } from '../hooks/use-storage';

type CartItem = {
  id: string;
  qty: number;
};

type AppContextValue = {
  cartItems: CartItem[];
  cartIds: string[];
  addToCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
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

  const cartIds = cartItems.map(item => item.id);

  const addToCart = (id: string) => {
    const existing = cartItems.find(item => item.id === id);

    let next = cartItems;

    if (existing) {
      next = cartItems.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      );
    } else {
      next = [...cartItems, { id, qty: 1 }];
    }

    setCartItems(next);
  };

  const deleteFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const changeQty = (id: string, delta: number) => {
    const next = cartItems
      .map(item => (item.id === id ? { ...item, qty: item.qty + delta } : item))
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
