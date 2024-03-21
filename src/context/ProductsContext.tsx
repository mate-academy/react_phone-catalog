/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

import { Product, ProductCart } from '../types/Product';
import { LocalStorage } from '../types/LocalStorage';
import { wait, addDeleteExistItemFromArray } from '../utils';

const LOCAL_STORAGE_KEY = 'todos';
// const LOCAL_STORAGE_KEY_CART = 'cart';
// const LOCAL_STORAGE_KEY_FAVOURITE = 'favourite';

interface ProductContextValues {
  products: Product[];
  setProducts: (product: Product[]) => void;
  cartItems: ProductCart[];
  addDelProductCart: (product: ProductCart) => Promise<void>;
  favouriteItems: Product[];
  addDelProductFavourite: (product: Product) => Promise<void>;
  updateProductCartQty: (idX: string, qty: number) => Promise<void>;
}

export const ProductContext = React.createContext({} as ProductContextValues);

type Props = {
  children: React.ReactNode;
};

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>(
    LOCAL_STORAGE_KEY,
    [],
  );

  const [cartItemsLocalStorage, setCartItemsLocalStorage] = useLocalStorage<
  ProductCart[]
  >(LocalStorage.cart, []);

  const [cartItems, setCartItems] = useState<ProductCart[]>(
    cartItemsLocalStorage,
  );

  const [favouriteItemsLocalStorage, setFavouriteItemsLocalStorage]
    = useLocalStorage<Product[]>(LocalStorage.favourites, []);

  const [favouriteItems, setFavouriteItems] = useState<Product[]>(
    favouriteItemsLocalStorage,
  );

  const addDelProductFavourite = async (item: Product) => {
    return wait(100).then(() => {
      setFavouriteItems(currentItems => {
        const items = addDeleteExistItemFromArray(item, currentItems, 'id');

        setFavouriteItemsLocalStorage(items);

        return items;
      });
    });
  };

  const addDelProductCart = async (item: Product) => {
    return wait(200).then(() => {
      setCartItems(currentItems => {
        const items = addDeleteExistItemFromArray(item, currentItems, 'id');
        const itemsWithQty = [...items].map(itm => {
          return {
            ...itm,
            cartQty: (itm.cartQty as number) || 1,
          };
        });

        setCartItemsLocalStorage(itemsWithQty);

        return itemsWithQty;
      });
    });
  };

  const updateProductCartQty = async (itemId: string, qty: number) => {
    return wait(200).then(() => {
      setCartItems(currentItems => {
        const items = currentItems.map(item => {
          if (item.itemId === itemId) {
            return {
              ...item,
              cartQty: qty,
            };
          }

          return item;
        });

        setCartItemsLocalStorage(items);

        return items;
      });
    });
  };

  const value = useMemo(
    () => ({
      products,
      setProducts,
      cartItems,
      addDelProductCart,
      favouriteItems,
      addDelProductFavourite,
      updateProductCartQty,
    }),
    [products, favouriteItems, cartItems],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
