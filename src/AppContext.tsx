import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ProductType } from './types/ProductType';
import { getProducts } from './api';
import { useParams } from 'react-router-dom';

type ListType = 'cart' | 'fav';

type ContextProps = {
  products: ProductType[];
  isLoading: boolean;
  errorMessage: string;
  currentProduct: ProductType | null;
  cartItems: ProductType[];
  setCartItems: (newItems: ProductType[]) => void;
  favItems: ProductType[];
  setFavItems: (newItems: ProductType[]) => void;
  addItem: (newProduct: ProductType, type: ListType) => void;
  removeItem: (productIr: number, type: ListType) => void;
};

export const AppContext = createContext<ContextProps>({
  products: [],
  isLoading: false,
  errorMessage: '',
  currentProduct: null,
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null,
  );
  const { productId } = useParams<{ productId: string }>();

  // console.log(productId);

  useEffect(() => {
    setIsLoading(true);
    if (productId === undefined) {
      setErrorMessage('Product ID is missing!');
      setIsLoading(false);

      return;
    }

    getProducts()
      .then(setProducts)
      .catch(() => {
        setErrorMessage('Something went wrong!');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setIsLoading(false));

    setCurrentProduct(products.find(p => p.id === +productId) || null);
  }, [productId, products]);

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

  const removeItem = (removeProductId: number, type: 'cart' | 'fav') => {
    const items = type === 'cart' ? cartItems : favItems;
    const setItems = type === 'cart' ? setCartItems : setFavItems;

    setItems([
      ...items.filter((item: ProductType) => item.id !== removeProductId),
    ]);
  };

  const value = {
    products,
    isLoading,
    errorMessage,
    currentProduct,
    cartItems,
    setCartItems,
    favItems,
    setFavItems,
    addItem,
    removeItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
