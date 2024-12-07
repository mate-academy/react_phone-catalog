import { useCallback, useEffect, useMemo, useState } from 'react';

import { LocalStorage } from '@shared/services/LocalStorage';
import { StoredProduct } from '@shared/types/Product/Product.interfaces';
import { contextFactory } from '@shared/utils/contextFactory';

import {
  DoneAction,
  updateProducts,
  UpdateProductsProps,
} from './updateProducts';

type StoredKey = 'cartProducts' | 'favoriteProducts';

interface StoredProductsProps {
  children: React.ReactNode;
}

interface StoredProductsState {
  cartProducts: StoredProduct[];
  favoriteProducts: StoredProduct[];
}

interface StoredQuantityState {
  total: number;
  favorite: number;
  cart: number;
}

interface UpdateStoredProductsProps
  extends Omit<UpdateProductsProps, 'products'> {
  storedKey: StoredKey;
  storedProducts: StoredProductsState;
  callback?: (doneAction: DoneAction) => void;
}

interface StoredProducts {
  storedProducts: StoredProductsState;
  storedQuantity: StoredQuantityState;
  updateStoredProducts: (props: UpdateStoredProductsProps) => {
    doneAction: DoneAction;
  };
}

const initialValue: StoredProducts = {
  storedProducts: {
    cartProducts: [],
    favoriteProducts: [],
  },
  storedQuantity: {
    total: 0,
    cart: 0,
    favorite: 0,
  },
  updateStoredProducts: () => ({ doneAction: 'added' }),
};

const { context: StoredProductsContext, useContext: useStoredProducts } =
  contextFactory<StoredProducts>({
    initialValue,
  });

const StoredProductsProvider = ({ children }: StoredProductsProps) => {
  const [products, setProducts] = useState<StoredProductsState>({
    cartProducts: [],
    favoriteProducts: [],
  });

  const storedQuantity = useMemo(() => {
    const cartTotal = products.cartProducts.reduce(
      (acc, { quantity }) => acc + quantity,
      0,
    );

    return {
      total: cartTotal + products.favoriteProducts.length,
      favorite: products.favoriteProducts.length,
      cart: cartTotal,
    };
  }, [products]);

  // first render init context
  useEffect(() => {
    const storedCartProducts =
      LocalStorage.getItem<StoredProduct[]>('cartProducts') || [];

    const storedFavoriteProducts =
      LocalStorage.getItem<StoredProduct[]>('favoriteProducts') || [];

    setProducts({
      cartProducts: storedCartProducts,
      favoriteProducts: storedFavoriteProducts,
    });
  }, []);

  // update context fn
  const updateStoredProducts = useCallback(
    ({
      storedProducts,
      storedKey,
      productId,
      action,
      value,
      callback,
    }: UpdateStoredProductsProps) => {
      const productsToUpdate = storedProducts[storedKey];

      const { newProducts, doneAction } = updateProducts({
        products: productsToUpdate,
        productId,
        action,
        value,
      });

      LocalStorage.setItem(storedKey, newProducts);
      setProducts(prev => ({ ...prev, [storedKey]: newProducts }));

      if (callback) {
        callback(doneAction);
      }

      return { doneAction };
    },
    [setProducts],
  );

  return (
    <StoredProductsContext.Provider
      value={{
        storedProducts: products,
        storedQuantity,
        updateStoredProducts,
      }}
    >
      {children}
    </StoredProductsContext.Provider>
  );
};

export { StoredProductsProvider, useStoredProducts };
