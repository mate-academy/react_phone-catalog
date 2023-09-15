import React, { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/cartHelper';
import { CartProduct } from '../../types/CartProduct';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { useDebounce } from '../../helpers/useDebounce';
import { SearchContext } from '../../Context/SearchContext';
import { FavoritesStorageContext } from '../../Context/FavoritesStorageContext';
import { CartStorageContext } from '../../Context/CartStorageContext';

export const ContextProviders: FC = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartProduct>('Cart', []);
  const [favourites, setFavourites] = useLocalStorage<FavoriteProduct>('Favourites', []);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchValue, setSearchValue] = useState(query);

  const location = useLocation();

  const getTotalPrice = () => {
    if (!cartItems || !cartItems.length) {
      return 0;
    }

    const prices = cartItems
      .map((item: CartProduct) => item.price * item.quantity);

    return prices.reduce((prev: number, current: number) => prev + current);
  };

  const getTotalCartItems = () => {
    if (!cartItems || !cartItems.length) {
      return null;
    }

    const quantities = cartItems
      .map((item: CartProduct) => item.quantity);

    return quantities.reduce((prev: number, current: number) => prev + current);
  };

  const handleAddToCart = (addedValue: CartProduct) => {
    if (!setCartItems) {
      return;
    }

    setCartItems([...cartItems, addedValue]);
  };

  const handleAddToFavorites = (addedValue: FavoriteProduct) => {
    if (!setFavourites) {
      return;
    }

    setFavourites([...favourites, addedValue]);
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    if (!setFavourites) {
      return;
    }

    const filteredItems = favourites
      .filter((item: FavoriteProduct) => item.itemId !== itemId);

    setFavourites(filteredItems);
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
    <SearchContext.Provider
      value={{
        searchValue,
        onInputChange,
        handleInputQuery,
      }}
    >
      <FavoritesStorageContext.Provider
        value={{
          favourites,
          setFavourites,
          handleAddToFavorites,
          handleRemoveFromFavorites,
        }}
      >
        <CartStorageContext.Provider
          value={{
            cartItems,
            setCartItems,
            getTotalPrice,
            handleAddToCart,
            getTotalCartItems,
          }}
        >
          {children}
        </CartStorageContext.Provider>
      </FavoritesStorageContext.Provider>
    </SearchContext.Provider>
  );
};
