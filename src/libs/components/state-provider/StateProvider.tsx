import { useEffect, useState } from 'react';
import { ProductType, ProductInCartType } from '../../types';
import { useLocalStorage } from '../../hooks';
import { ErrorMessages, StorageKeys } from '../../enums';
import { productServices as services } from '../../services/product-services';
import { StateContext } from './state-context';

type Props = {
  children: React.ReactNode,
};

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage]
    = useState<string>(ErrorMessages.NoError);

  const [cart, setCart]
    = useLocalStorage<ProductInCartType[]>(StorageKeys.CART, []);

  const [favorites, setFavorites]
    = useLocalStorage<ProductType[]>(StorageKeys.FAVORITES, []);

  useEffect(() => {
    services.getProducts()
      .then(setProducts)
      .catch((error: Error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const state = {
    products,
    isLoading,
    errorMessage,
    cart,
    setCart,
    favorites,
    setFavorites,
  };

  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
};
