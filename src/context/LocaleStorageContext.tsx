import { ReactNode, useState, createContext } from 'react';

export interface Cart {
  id: string;
  amount: number;
  price: number;
}

interface LocalStorageContextType {
  favs: string[];
  toggleFavorite: (newValue: string) => void;
  carts: Cart[];
  addToCart: (item: string, count: number, price: number) => void;
  removeFromCart: (item: string) => void;
  updateCart: (cartId: string, count: number) => void;
}

export const LocalStorageContext = createContext<LocalStorageContextType>({
  favs: [],
  toggleFavorite: () => {},
  carts: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCart: () => {},
});

interface Props {
  children: ReactNode;
}

export const LocalStorageProvider: React.FC<Props> = ({ children }) => {
  const favData = localStorage.getItem('favorite');
  const cartData = localStorage.getItem('carts');

  const initialFavs = favData ? JSON.parse(favData) : [];
  const initialCarts = cartData ? JSON.parse(cartData) : [];

  const [favs, setFavs] = useState<string[]>(initialFavs);
  const [carts, setCarts] = useState<Cart[]>(initialCarts);

  const addToCart = (cartId: string, count: number, price: number) => {
    const newCart = { id: cartId, amount: count, price: price };
    const updatedCarts = [...carts, newCart];

    setCarts(updatedCarts);
    localStorage.setItem('carts', JSON.stringify(updatedCarts));
  };

  const removeFromCart = (cartId: string) => {
    const updatedCarts = carts.filter(item => item.id !== cartId);

    setCarts(updatedCarts);
    localStorage.setItem('carts', JSON.stringify(updatedCarts));
  };

  const updateCart = (cartId: string, count: number) => {
    const updated = carts.map(cart => {
      return cart.id === cartId ? { ...cart, amount: count } : cart;
    });

    setCarts(updated);

    localStorage.setItem('carts', JSON.stringify(updated));
  };

  const toggleFavorite = (value: string) => {
    let updatedFavs;

    if (favs.includes(value)) {
      updatedFavs = favs.filter(item => item !== value);
    } else {
      updatedFavs = [...favs, value];
    }

    setFavs(updatedFavs);
    localStorage.setItem('favorite', JSON.stringify(updatedFavs));
  };

  const obj = {
    favs,
    toggleFavorite,
    carts,
    addToCart,
    removeFromCart,
    updateCart,
  };

  return (
    <LocalStorageContext.Provider value={obj}>
      {children}
    </LocalStorageContext.Provider>
  );
};
