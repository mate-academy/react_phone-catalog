import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { OrderedProduct } from '../../type/OrderedProduct';
import { getProducts } from '../../api';
import { Product } from '../../type/Product';
import { Message } from '../../type/Message';

function debounce(
  callback: (...args: any[]) => void,
  delay: number,
) {
  let timerId = 0;

  return (...args: any) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

type Context = {
  orderedProducts: OrderedProduct[],
  setOrderedProducts: React.Dispatch<React.SetStateAction<OrderedProduct[]>>
  favoriteProducts: Product[],
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  isLoading: boolean,
  isError: boolean
  message: Message | '',
  setMessage: React.Dispatch<React.SetStateAction<Message | ''>>,
  appliedQuery: string,
  setAppliedQuery: React.Dispatch<React.SetStateAction<string>>
  applyQuery: React.Dispatch<React.SetStateAction<string>>
};

export const CartContext = React.createContext<Context>({
  orderedProducts: [],
  setOrderedProducts: () => { },
  products: [],
  setProducts: () => { },
  isLoading: false,
  isError: false,
  message: '',
  setMessage: () => { },
  favoriteProducts: [],
  setFavoriteProducts: () => { },
  appliedQuery: '',
  setAppliedQuery: () => { },
  applyQuery: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState<OrderedProduct[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<Message | ''>('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = (useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  ));

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getProducts()
      .then(setProducts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const favoriteList = localStorage.getItem('favoriteItems');
    const cartList = localStorage.getItem('cartItems');

    setFavoriteProducts(JSON.parse(favoriteList || '[]'));
    setOrderedProducts(JSON.parse(cartList || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(orderedProducts));
  }, [orderedProducts]);

  const value = useMemo(() => ({
    orderedProducts,
    setOrderedProducts,
    favoriteProducts,
    setFavoriteProducts,
    products,
    setProducts,
    isLoading,
    message,
    setMessage,
    isError,
    appliedQuery,
    setAppliedQuery,
    applyQuery,
  }), [
    products,
    orderedProducts,
    message,
    favoriteProducts,
    appliedQuery,
    isLoading,
    applyQuery,
    isError,
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
