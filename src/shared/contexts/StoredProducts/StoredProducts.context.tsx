import { useCallback, useEffect, useMemo, useState } from 'react';

import { LocalStorage } from '@shared/services/LocalStorage';
import { StoredProduct } from '@shared/types/Product/Product.interfaces';
import { contextFactory } from '@shared/utils/contextFactory';

import {
  DoneAction,
  updateProducts,
  UpdateProductsProps,
} from './updateProducts';

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

interface StoredProducts {
  storedProducts: StoredProductsState;
  storedQuantity: StoredQuantityState;
  updateStoredProducts: (props: UpdateStoredProductsProps) => {
    doneAction: DoneAction;
  };
}

interface UpdateStoredProductsProps
  extends Omit<UpdateProductsProps, 'products'> {
  storedKey: 'cartProducts' | 'favoriteProducts';
  storedProducts: StoredProductsState;
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
    }: UpdateStoredProductsProps) => {
      const productsToUpdate = storedProducts[storedKey];

      const { newProducts, doneAction } = updateProducts({
        products: productsToUpdate,
        productId,
        action,
      });

      LocalStorage.setItem(storedKey, newProducts);
      setProducts(prev => ({ ...prev, [storedKey]: newProducts }));

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
