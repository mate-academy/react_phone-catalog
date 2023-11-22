import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { getProducts } from '../../api/products';
import { ContextValue } from '../../types/ContextValue';
import { Product } from '../../types/Product';
import { Error } from '../../types/Error';
import { ProductDetailsType } from '../../types/ProductDetails';

export const Context = createContext<ContextValue>({
  products: [],
  selectedProduct: JSON.parse(`${localStorage.getItem('selectedProduct')}`),
  cart: [],
  favorite: [],
  error: null,
  isLoading: false,
  setProducts: () => {},
  setSelectedProduct: () => {},
  setCart: () => {},
  setFavorite: () => {},
  setError: () => {},
  setIsLoading: () => {},
});

type Props = {
  children: ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const cartStorage = JSON.parse(`${localStorage.getItem('cart') || '[]'}`);
  const favoriteStorage = JSON.parse(`${localStorage.getItem('favorite') || '[]'}`);
  const selectedProductStorage = JSON.parse(`${localStorage.getItem('selectedProduct')}`);

  const [products, setProducts] = useState<Product[]>([]);
  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState<ProductDetailsType>(selectedProductStorage);
  const [cart, setCart] = useState<Product[]>(cartStorage);
  const [favorite, setFavorite] = useState<Product[]>(favoriteStorage);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const contextValue: ContextValue = {
    products,
    selectedProduct,
    cart,
    favorite,
    error,
    isLoading,
    setProducts,
    setSelectedProduct,
    setCart,
    setFavorite,
    setError,
    setIsLoading,
  };

  const handleGetProducts = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const productList = await getProducts();

      setProducts(productList);
    } catch {
      setError(Error.GET_PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <Context.Provider
      value={contextValue}
    >
      {children}
    </Context.Provider>
  );
};
