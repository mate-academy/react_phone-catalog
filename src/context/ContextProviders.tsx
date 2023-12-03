import { FC, useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '../helpers/cartHelpers';
import { CartProduct } from '../types/CartProduct';
import { FavoriteStorageContext } from './FavoriteStorageContext';
import { CartStorageContext } from './CartStorageContext';
import { SearchStorageContext } from './SearchStorageContext';
import { FavoriteItem } from '../types/FavoriteItem';
import { useDebounce } from '../helpers/useDebounce';

export const ContextProviders: FC = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('Cart', []);
  const [favorites, setFavorites] = useLocalStorage('Favorites', []);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchValue, setSearchValue] = useState(query);
  const location = useLocation();

  const getTotalPrice = () => {
    if (!cartItems || !cartItems.length) {
      return null;
    }

    const price = cartItems
      .map((item: CartProduct) => item.price * item.quantity);

    return price.reduce((prev: number, current: number) => prev + current);
  };

  const getTotalCartItems = () => {
    if (!cartItems || !cartItems.length) {
      return null;
    }

    const count = cartItems
      .map((item: CartProduct) => item.quantity);

    return count.reduce((prev: number, current: number) => prev + current);
  };

  const handleAddToCart = (addedValue: CartProduct) => {
    if (!setCartItems) {
      return;
    }

    setCartItems([...cartItems, addedValue]);
  };

  const handleRemoveFromCart = (itemId: string) => {
    if (!setCartItems) {
      return;
    }

    const filteredItems = cartItems
      .filter((item: CartProduct) => item.id !== itemId);

    setCartItems(filteredItems);
  };

  const handleAddToFavorites = (addedValue: FavoriteItem) => {
    if (!setFavorites) {
      return;
    }

    setFavorites([...favorites, addedValue]);
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    if (!setFavorites) {
      return;
    }

    const filteredItems = favorites
      .filter((item: FavoriteItem) => item.itemId !== itemId);

    setFavorites(filteredItems);
  };

  const onInputChange = (value: string) => {
    setSearchValue(value);
  };

  const handleInputQuery = (value: string) => {
    if (!value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }

    setSearchParams(searchParams);
  };

  const debouncedValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    handleInputQuery(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setSearchValue('');
  }, [location.pathname]);

  return (
    <SearchStorageContext.Provider
      value={{
        searchValue,
        onInputChange,
        handleInputQuery,
      }}
    >
      <FavoriteStorageContext.Provider
        value={{
          favorites,
          setFavorites,
          handleAddToFavorites,
          handleRemoveFromFavorites,
        }}
      >
        <CartStorageContext.Provider
          value={{
            cartItems,
            setCartItems,
            handleAddToCart,
            handleRemoveFromCart,
            getTotalPrice,
            getTotalCartItems,
          }}
        >
          {children}
        </CartStorageContext.Provider>
      </FavoriteStorageContext.Provider>
    </SearchStorageContext.Provider>
  );
};
