/* eslint-disable no-console */
import React, { useState, useEffect, useMemo } from 'react';
import { Store } from '../types/Store';
import { getProducts } from '../services/getProducts';
import { Product } from '../types/Product';
import { useLocalStorage } from '../customHooks/useLocalStorage';
import { Cart } from '../types/Cart';

const defaultStore: Store = {
  products: [],
  cart: {},
  cartItemsNumber: 0,
  changeCart: () => {},
  favouriteIds: [],
  changeFavourites: () => {},
};

export const StoreContext = React.createContext<Store>(defaultStore);

type Props = {
  children: React.ReactNode;
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorage<Cart>('cart', {});
  const [
    favouriteIds,
    setFavouriteIds,
  ] = useLocalStorage<string[]>('favourites', []);
  const cartItemsNumber = useMemo(() => (
    Object.values(cart)
      .reduce((sum, product) => sum + product.quantity, 0)
  ), [cart]);

  const changeCart = (key: string, qty: number) => {
    const changedCart = { ...cart };

    if (!(key in cart)) {
      const good = products.find(
        product => product.itemId === key,
      );

      if (good) {
        changedCart[key] = {
          good,
          quantity: 0,
          itemTotalPrice: 0,
        };
      }
    }

    changedCart[key].quantity += qty;
    changedCart[key].itemTotalPrice
    = changedCart[key].good.price * changedCart[key].quantity;

    if (changedCart[key].quantity <= 0) {
      delete changedCart[key];
    }

    setCart(changedCart);
  };

  const changeFavourites = (id: string) => {
    const changedFavouriteIds = favouriteIds.includes(id) ? (
      [...favouriteIds].filter(favId => favId !== id)
    ) : (
      [...favouriteIds, id]
    );

    setFavouriteIds(changedFavouriteIds);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromServer = await getProducts();

        setProducts(productsFromServer);
      } catch {
        setProducts(defaultStore.products);
      }
    };

    loadProducts();
  }, []);

  const store = useMemo(() => {
    const memoStore: Store = {
      products,
      cart,
      cartItemsNumber,
      changeCart,
      favouriteIds,
      changeFavourites,
    };

    return memoStore;
  }, [products, cart, favouriteIds]);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
