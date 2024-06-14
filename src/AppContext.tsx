import React, { createContext, useContext, useEffect, useState } from 'react';
import { PageSection } from './types/PageSection';
import { Products } from './types/Products';
import productsFromServer from './api/products.json';

interface AppContextInterface {
  currentPage: PageSection;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageSection>>;
  favourites: Products[];
  setFavourites: React.Dispatch<React.SetStateAction<Products[]>>;
  cart: Products[];
  setCart: React.Dispatch<React.SetStateAction<Products[]>>;
  phones: Products[];
  tablets: Products[];
  accessories: Products[];
  handleAddFavourite: (model: Products) => void;
  handleAddCart: (model: Products) => void;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  itemCounts: Record<number, number>;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(PageSection.Home);
  const [favourites, setFavourites] = useState<Products[]>([]);
  const [cart, setCart] = useState<Products[]>([]);
  const [itemCounts, setItemCounts] = useState<Record<number, number>>({});
  const phones = productsFromServer.filter(
    product => product.category === 'phones',
  );

  const tablets = productsFromServer.filter(
    product => product.category === 'tablets',
  );

  const accessories = productsFromServer.filter(
    product => product.category === 'accessories',
  );

  const handleAddFavourite = (model: Products) => {
    const index = favourites.findIndex(item => item.id === model.id);

    if (index !== -1) {
      // Model is already in favourites, remove it
      setFavourites(prevFavourites =>
        prevFavourites.filter(item => item.id !== model.id),
      );
    } else {
      // Model is not in favourites, add it
      setFavourites(prevFavourites => [...prevFavourites, model]);
    }
  };

  const handleAddCart = (model: Products) => {
    const index = cart.findIndex(item => item.id === model.id);

    if (index !== -1) {
      setCart(prevCart => prevCart.filter(item => item.id !== model.id));
      setItemCounts(prevCounts => {
        const newCounts = { ...prevCounts };

        delete newCounts[model.id];

        return newCounts;
      });
    } else {
      setCart(prevCart => [...prevCart, model]);
      setItemCounts(prevCounts => ({
        ...prevCounts,
        [model.id]: 1,
      }));
    }
  };

  const handleDecrement = (id: number) => {
    setItemCounts(prevCounts => {
      if (prevCounts[id] > 1) {
        setCart(prevCart => {
          const index = prevCart.findIndex(item => item.id === id);

          if (index > -1) {
            return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
          }

          return prevCart;
        });

        return {
          ...prevCounts,
          [id]: prevCounts[id] - 1,
        };
      }

      return prevCounts;
    });
  };

  const handleIncrement = (id: number) => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }));
    setCart(prevCart => {
      const product = productsFromServer.find(item => item.id === id);

      if (product) {
        return [...prevCart, product];
      }

      return prevCart;
    });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavourites = localStorage.getItem('favourites');
    const savedItemCounts = localStorage.getItem('itemCounts');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }

    if (savedItemCounts) {
      setItemCounts(JSON.parse(savedItemCounts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favourites', JSON.stringify(favourites));
    localStorage.setItem('itemCounts', JSON.stringify(itemCounts));
  }, [cart, favourites, itemCounts]);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        favourites,
        setFavourites,
        cart,
        setCart,
        phones,
        tablets,
        accessories,
        handleAddFavourite,
        handleAddCart,
        handleDecrement,
        handleIncrement,
        itemCounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
