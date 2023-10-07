import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { Error } from '../types/ErrorType';
import { getProducts } from '../api/Products';
import { useLocalStorage } from '../utils/useLocaleStorage';
import { getProductToSave } from '../utils/getProductToSave';

type ContextValue = {
  products: Product[],
  selectedProduct: ProductDetails,
  cart: Product[],
  favorite: Product[],
  isError: Error | null,
  isLoading: boolean;
  setProducts: Dispatch<SetStateAction<Product[]>>,
  setSelectedProduct: Dispatch<SetStateAction<ProductDetails>>,
  setCart: Dispatch<SetStateAction<Product[]>>,
  setFavorite: Dispatch<SetStateAction<Product[]>>,
  setIsError: Dispatch<SetStateAction<Error | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  changeCart: (newProduct: Product) => void,
  changeFavorite: (newProduct: Product) => void,
};

export const Context = React.createContext<ContextValue>({
  products: [],
  selectedProduct: JSON.parse(`${localStorage.getItem('selectedProduct')}`),
  cart: [],
  favorite: [],
  isError: null,
  isLoading: false,
  setProducts: () => {},
  setSelectedProduct: () => {},
  setCart: () => {},
  setFavorite: () => {},
  setIsError: () => {},
  setIsLoading: () => {},
  changeCart: () => {},
  changeFavorite: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const selectedProductStorage = JSON.parse(`${localStorage.getItem('selectedProduct')}`);

  const [products, setProducts] = useState<Product[]>([]);
  const [
    selectedProduct, setSelectedProduct,
  ] = useState<ProductDetails>(selectedProductStorage);
  const [cart, setCart] = useLocalStorage('cart', []);
  const [favorite, setFavorite] = useLocalStorage('favorite', []);
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const changeCart = getProductToSave(
    'cart',
    cart,
    setCart,
  );
  const changeFavorite = getProductToSave(
    'favorite',
    favorite,
    setFavorite,
  );

  const contextValue: ContextValue = {
    products,
    selectedProduct,
    cart,
    favorite,
    isError,
    isLoading,
    setProducts,
    setSelectedProduct,
    setCart,
    setFavorite,
    setIsError,
    setIsLoading,
    changeCart,
    changeFavorite,
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
      } catch (error) {
        setIsError(Error.GET_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
