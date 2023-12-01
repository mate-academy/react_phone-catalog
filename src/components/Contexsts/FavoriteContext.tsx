import { useContext, createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export type FavoriteItem = {
  id: number;
  quantity: number;
};

type FavoritesContext = {
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  getItemQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  favoriteQuantity: number;
  favoriteItems: FavoriteItem[];
};

const FavoriteContext = createContext({} as FavoritesContext);

export const useFavorite = () => useContext(FavoriteContext);

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    return JSON.parse(data);
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useLocalStorage<FavoriteItem[]>(
    'cartItems',
    [],
  );
  const favoriteQuantity = favoriteItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  const getItemQuantity = (id: number) => {
    return favoriteItems.find((item) => item.id === id)?.quantity || 0;
  };

  const addToCart = (id: number) => {
    if (favoriteItems.find((item) => item.id === id) == null) {
      setFavoriteItems([...favoriteItems, { id, quantity: 1 }]);
    } else {
      const newFavoriteItems = favoriteItems.map(
        (item: { id: number; quantity: number }) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        },
      );

      setFavoriteItems(newFavoriteItems);
    }
  };

  const increaseQuantity = (id: number) => {
    if (favoriteItems.find((item) => item.id === id) == null) {
      setFavoriteItems([...favoriteItems, { id, quantity: 1 }]);
    } else {
      const newFavoriteItems = favoriteItems.map((item: FavoriteItem) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      setFavoriteItems(newFavoriteItems);
    }
  };

  const decreaseQuantity = (id: number) => {
    if (favoriteItems.find((item) => item.id === id) == null) {
      setFavoriteItems([...favoriteItems, { id, quantity: 1 }]);
    } else {
      const newFavoriteItems = favoriteItems.map((item: FavoriteItem) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });

      setFavoriteItems(newFavoriteItems);
    }
  };

  const removeFromCart = (id: number) => {
    const newFavorites = favoriteItems.filter((item) => item.id !== id);

    setFavoriteItems(newFavorites);
  };

  return (
    <FavoriteContext.Provider
      value={{
        addToCart,
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        favoriteItems,
        favoriteQuantity,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
