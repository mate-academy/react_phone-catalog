import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ProductType } from './types/ProductType';
import { getAccessories, getPhones, getProducts, getTablets } from './api';
import { ProductTypeExtended } from './types/ProductTypeExtended';

type ListType = 'cart' | 'fav';

type ContextProps = {
  products: ProductType[];
  phones: ProductTypeExtended[];
  tablets: ProductTypeExtended[];
  accessories: ProductTypeExtended[];
  isLoading: boolean;
  errorMessage: string;
  setErrorMessage: (newMessage: string) => void;
  cartItems: ProductType[];
  setCartItems: (newItems: ProductType[]) => void;
  favItems: ProductType[];
  setFavItems: (newItems: ProductType[]) => void;
  addItem: (newProduct: ProductType, type: ListType) => void;
  removeItem: (productIr: number, type: ListType) => void;
};

export const AppContext = createContext<ContextProps>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  isLoading: false,
  errorMessage: '',
  setErrorMessage: () => {},
  cartItems: [],
  setCartItems: () => {},
  favItems: [],
  setFavItems: () => {},
  addItem: () => {},
  removeItem: () => {},
});

type Props = {
  children: ReactNode;
};

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [phones, setPhones] = useState<ProductTypeExtended[]>([]);
  const [tablets, setTablets] = useState<ProductTypeExtended[]>([]);
  const [accessories, setAccessories] = useState<ProductTypeExtended[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then(setPhones)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getTablets()
      .then(setTablets)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getAccessories()
      .then(setAccessories)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const [cartItems, setCartItems] = useLocalStorage<ProductType[]>(
    'cartItems',
    [],
  );

  const [favItems, setFavItems] = useLocalStorage<ProductType[]>(
    'favItems',
    [],
  );

  const addItem = (product: ProductType, type: 'cart' | 'fav') => {
    const items = type === 'cart' ? cartItems : favItems;
    const setItems = type === 'cart' ? setCartItems : setFavItems;

    const isExistingProduct = items.find(item => item.id === product.id);

    if (isExistingProduct) {
      setItems(items.filter(item => item.id !== product.id));
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (productId: number, type: 'cart' | 'fav') => {
    const items = type === 'cart' ? cartItems : favItems;
    const setItems = type === 'cart' ? setCartItems : setFavItems;

    setItems([...items.filter((item: ProductType) => item.id !== productId)]);
  };

  const value = {
    products,
    phones,
    tablets,
    accessories,
    isLoading,
    errorMessage,
    setErrorMessage,
    cartItems,
    setCartItems,
    favItems,
    setFavItems,
    addItem,
    removeItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
