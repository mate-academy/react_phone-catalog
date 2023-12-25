/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UpgradedProduct } from '../types/UpgradedProduct';

type Props = {
  children: React.ReactNode;
};

type Action = ''
  | 'favourites'
  | 'cart'
  | 'remove'
  | 'minusQuantity'
  | 'plusQuantity';

type Store = {
  products: UpgradedProduct[];
  localStorage: UpgradedProduct[];
  handleAction: (product: UpgradedProduct, action: Action) => void;
  isLoader: boolean,
  isError: boolean,
};

const initialStore: Store = {
  products: [],
  localStorage: [],
  handleAction: () => { },
  isLoader: false,
  isError: false,
};

export const StateStore = React.createContext(initialStore);

export const StoreContext: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<UpgradedProduct[]>([]);
  const [localStorage, setLocalStorage]
    = useLocalStorage<UpgradedProduct[]>('products', []);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    setIsError(false);

    getProducts()
      .then(resolve => {
        const newProducts = resolve.map(item => {
          return localStorage.find(existItem => existItem.id === item.id)
            || ({
              ...item,
              addedToFavourites: false,
              addedToCart: false,
              quantity: 1,
            });
        });

        setProducts(newProducts);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  const handleAction = (product: UpgradedProduct, action: Action) => {
    const newProducts = [...products];
    const indexOfProduct = newProducts.indexOf(product);

    switch (action) {
      case 'favourites':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, addedToFavourites: !product.addedToFavourites },
        );
        break;

      case 'cart':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, addedToCart: !product.addedToCart },
        );
        break;

      case 'remove':
        newProducts.splice(
          indexOfProduct,
          1,
          {
            ...product,
            addedToCart: false,
            quantity: 1,
          },
        );
        break;

      case 'minusQuantity':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, quantity: product.quantity - 1 },
        );
        break;

      case 'plusQuantity':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, quantity: product.quantity + 1 },
        );
        break;

      default:
        break;
    }

    setProducts(newProducts);
    setLocalStorage(
      newProducts.filter(
        item => item.addedToCart
          || item.addedToFavourites,
      ),
    );
  };

  const store: Store = {
    products,
    localStorage,
    handleAction,
    isLoader,
    isError,
  };

  return (
    <StateStore.Provider value={store}>
      {children}
    </StateStore.Provider>
  );
};
