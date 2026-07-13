import { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';
type FavouritesItem = {
  id: string;
  product: Product;
  quantity: number;
};
type FavouritesContextType = {
  favouriteItems: FavouritesItem[];
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (id: string) => void;
  removeAllFromFavourites: () => void;
  updateQuantity: (id: string, delta: number) => void;
  total: number;
  totalQuantity: number;
};
const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [FavouritesItems, setItems] = useState<FavouritesItem[]>(() => {
    const saved = localStorage.getItem('Favourites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('Favourites', JSON.stringify(FavouritesItems));
  }, [FavouritesItems]);

  const addToFavourites = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev;
      }

      return [...prev, { id: product.id, product, quantity: 1 }];
    });
  };

  const removeFromFavourites = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const removeAllFromFavourites = () => {
    setItems([]);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }

          return item;
        })
        .filter(item => item.quantity > 0),
    );
  };

  const total = FavouritesItems.reduce(
    (sum, item) => sum + item.product.priceDiscount * item.quantity,
    0,
  );

  const totalQuantity = FavouritesItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <FavouritesContext.Provider
      value={{
        favouriteItems: FavouritesItems,
        addToFavourites,
        removeFromFavourites,
        removeAllFromFavourites,
        updateQuantity,
        total,
        totalQuantity,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }

  return context;
};
