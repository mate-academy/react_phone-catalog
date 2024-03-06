import React, { useEffect, useState } from 'react';
import { ProductExtended } from '../types/ProductExtended';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorate';
import { Action } from '../types/Action';

type Props = {
  children: React.ReactNode;
};

type Store = {
  products: ProductExtended[];
  localStorage: ProductExtended[];
  actionHandler: (product: ProductExtended, action: Action) => void;
  isError: boolean;
  isLoading: boolean;
};

const initialStore: Store = {
  products: [],
  localStorage: [],
  actionHandler: () => {},
  isError: false,
  isLoading: false,
};

export const StateStore = React.createContext(initialStore);

export const StoreContext: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductExtended[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage<ProductExtended[]>(
    'products',
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(response => {
        const newProducts = response.map(
          item =>
            localStorage.find(
              (currentItem: Product) => currentItem.id === item.id,
            ) || {
              ...item,
              addedToFavorites: false,
              addedToCart: false,
              quantity: 1,
            },
        );

        setProducts(newProducts);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionHandler = (product: ProductExtended, action: Action) => {
    const newProducts = [...products];
    const indexOfProduct = newProducts.indexOf(product);

    switch (action) {
      case Action.toggleCart:
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          addedToCart: !product.addedToCart,
        });
        break;

      case Action.removeFromCart:
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          addedToCart: false,
          quantity: 1,
        });
        break;

      case Action.increaseQuantity:
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          quantity: product.quantity + 1,
        });
        break;

      case Action.decreaseQuantity:
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          quantity: product.quantity - 1,
        });
        break;

      case Action.toggleFavorite:
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          addedToFavorites: !product.addedToFavorites,
        });
        break;

      default:
        break;
    }

    setProducts(newProducts);

    setLocalStorage(
      newProducts.filter(item => item.addedToFavorites || item.addedToCart),
    );
  };

  const store: Store = {
    products,
    localStorage,
    actionHandler,
    isError,
    isLoading,
  };

  return <StateStore.Provider value={store}>{children}</StateStore.Provider>;
};
