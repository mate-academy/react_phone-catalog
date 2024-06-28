import React, { useEffect, useState } from 'react';
import { UpgradedProduct } from '../types/UpgradedProduct';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getProducts } from '../api/httpClient';
import { Product } from '../types/Product';

type Props = {
  children: React.ReactNode;
};

type Action =
  | ''
  | 'favourites'
  | 'cart'
  | 'remove'
  | 'minusQuantity'
  | 'plusQuantity';

type ProductState = {
  products: UpgradedProduct[];
  localStorage: UpgradedProduct[];
  handleAction: (product: UpgradedProduct, action: Action) => void;
  isError: boolean;
  isLoading: boolean;
};

const initialProduct: ProductState = {
  products: [],
  localStorage: [],
  handleAction: () => {},
  isError: false,
  isLoading: false,
};

export const StateProduct = React.createContext(initialProduct);

export const ProductContext: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<UpgradedProduct[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage<UpgradedProduct[]>(
    'products',
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(resolve => {
        const newProducts = resolve.map(item => {
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
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = (product: UpgradedProduct, action: Action) => {
    const newProducts = [...products];
    const indexOfProduct = newProducts.indexOf(product);

    switch (action) {
      case 'favourites':
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          addedToFavourites: !product.addedToFavourites,
        });
        break;

      case 'cart':
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          addedToCart: !product.addedToCart,
        });
        break;

      case 'remove':
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          addedToCart: false,
          quantity: 1,
        });
        break;

      case 'minusQuantity':
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          quantity: product.quantity - 1,
        });
        break;

      case 'plusQuantity':
        newProducts.splice(indexOfProduct, 1, {
          ...product,
          quantity: product.quantity + 1,
        });
        break;

      default:
        break;
    }

    setProducts(newProducts);
    setLocalStorage(
      newProducts.filter(item => item.addedToFavourites || item.addedToCart),
    );
  };

  const product: ProductState = {
    products,
    localStorage,
    handleAction,
    isError,
    isLoading,
  };

  return (
    <StateProduct.Provider value={product}>{children}</StateProduct.Provider>
  );
};
