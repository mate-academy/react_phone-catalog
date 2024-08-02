import { createContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getProducts } from './api/fetchClient';
import { SliderProduct } from './types/SliderProduct';
import { StorageItem } from './types/StorageItem';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { Menu } from './components/Menu';
import { NotFoundPage } from './components/NotFoundPage';
import { ShoppingCart } from './components/ShoppingCart';

interface Context {
  products: SliderProduct[];
  setProducts: (v: SliderProduct[]) => void;
  productsLoading: boolean;
  setProductsLoading: (v: boolean) => void;
  productsError: string;
  setProductsError: (v: string) => void;
  cartItems: StorageItem[];
  setCartItems: (v: StorageItem[]) => void;
  favouritesItems: StorageItem[];
  setFavouritesItems: (v: StorageItem[]) => void;
  updatedAt: Date;
  setUpdatedAt: (date: Date) => void;
}

export const AppContext = createContext<Context>({
  products: [],
  setProducts: () => {},
  productsLoading: false,
  setProductsLoading: () => {},
  productsError: '',
  setProductsError: () => {},
  cartItems: [],
  setCartItems: () => {},
  favouritesItems: [],
  setFavouritesItems: () => {},
  updatedAt: new Date(),
  setUpdatedAt: () => {},
});

export const Root = () => {
  const [products, setProducts] = useState<SliderProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [productsError, setProductsError] = useState<string>('');

  const [cartItems, setCartItems] = useLocalStorage<StorageItem[]>(
    'cartItems',
    [],
  );

  const [favouritesItems, setFavouritesItems] = useLocalStorage<StorageItem[]>(
    'favouritesItems',
    [],
  );

  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

  const data = {
    products,
    setProducts,
    productsLoading,
    setProductsLoading,
    productsError,
    setProductsError,
    cartItems,
    setCartItems,
    favouritesItems,
    setFavouritesItems,
    updatedAt,
    setUpdatedAt,
  };

  useEffect(() => {
    setProductsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setProductsError('Oops! Something went wrong.'))
      .finally(() => setProductsLoading(false));
  }, [updatedAt]);

  return (
    <AppContext.Provider value={data}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/menu" element={<Menu />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};
