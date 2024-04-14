import React, { useEffect, useState } from 'react';
import { UpgratedProduct } from '../types/UpgratedProduct';
import { useLocalStorage } from '../hooks/UseLocalStorage';
import { getProducts } from '../apiHelper/product';
import { Product } from '../types/product';

type Props = {
  children: React.ReactNode;
};

type Action = 'favourites' | 'cart' | 'remove' | 'increase' | 'decrease';

type Store = {
  products: UpgratedProduct[];
  localStorage: UpgratedProduct[];
  handleAction: (product: UpgratedProduct, action: Action) => void;
  hasError: boolean;
  loading: boolean;
  handleClearAllCart: () => void;
};

const initialStore: Store = {
  products: [],
  localStorage: [],
  handleAction: () => {},
  hasError: false,
  loading: false,
  handleClearAllCart: () => {},
};

export const ProductState = React.createContext(initialStore);

export const StoreContext: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<UpgratedProduct[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage<UpgratedProduct[]>(
    'products',
    [],
  );
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getProducts()
      .then(items => {
        const newProducts = items.map(item => {
          return (
            localStorage.find(
              (currentItem: Product) => currentItem.id === item.id,
            ) || {
              ...item,
              addedToFavourites: false,
              addedToCart: false,
              quantity: 1,
            }
          );
        });

        setProducts(newProducts);
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearAllCart = () => {
    setProducts(prevState =>
      prevState.map(product => ({
        ...product,
        addedToCart: false,
      })),
    );

    setLocalStorage(prevState =>
      prevState.map(product => ({
        ...product,
        addedToCart: false,
      })),
    );
  };

  const handleAction = (product: UpgratedProduct, action: Action) => {
    const newProducts = [...products];
    const index = newProducts.indexOf(product);

    switch (action) {
      case 'favourites':
        newProducts.splice(index, 1, {
          ...product,
          addedToFavourites: !product.addedToFavourites,
        });
        break;

      case 'cart':
        newProducts.splice(index, 1, {
          ...product,
          addedToCart: !product.addedToCart,
        });
        break;

      case 'remove':
        newProducts.splice(index, 1, {
          ...product,
          addedToCart: false,
          quantity: 1,
        });
        break;

      case 'increase':
        newProducts.splice(index, 1, {
          ...product,
          quantity: product.quantity + 1,
        });
        break;

      case 'decrease':
        newProducts.splice(index, 1, {
          ...product,
          quantity: product.quantity - 1,
        });
        break;

      default:
        break;
    }

    setProducts(newProducts);
    setLocalStorage(
      newProducts.filter(elem => elem.addedToCart || elem.addedToFavourites),
    );
  };

  const store: Store = {
    products,
    localStorage,
    handleAction,
    hasError,
    loading,
    handleClearAllCart,
  };

  return (
    <ProductState.Provider value={store}>{children}</ProductState.Provider>
  );
};
