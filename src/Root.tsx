import { createContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getProducts } from './api/fetchClient';
import { SliderProduct } from './types/SliderProduct';
import { StorageItem } from './types/StorageItem';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { Favorites } from './components/Favorites';
import { ShoppingCart } from './components/ShoppingCart';
import { NotFoundPage } from './components/NotFoundPage';

interface Context {
  products: SliderProduct[];
  setProducts: (v: SliderProduct[]) => void;
  productsLoading: boolean;
  setProductsLoading: (v: boolean) => void;
  productsError: string;
  setProductsError: (v: string) => void;
  cartItems: StorageItem[];
  setCartItems: (v: StorageItem[]) => void;
  favoritesItems: StorageItem[];
  setFavoritesItems: (v: StorageItem[]) => void;
  updatedAt: Date;
  setUpdatedAt: (v: Date) => void;
  isMenuActive: boolean;
  setIsMenuActive: (v: boolean) => void;
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
  favoritesItems: [],
  setFavoritesItems: () => {},
  updatedAt: new Date(),
  setUpdatedAt: () => {},
  isMenuActive: false,
  setIsMenuActive: () => {},
});

export const Root = () => {
  const [products, setProducts] = useState<SliderProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [productsError, setProductsError] = useState<string>('');

  const [cartItems, setCartItems] = useLocalStorage<StorageItem[]>(
    'cartItems',
    [],
  );

  const [favoritesItems, setFavoritesItems] = useLocalStorage<StorageItem[]>(
    'favoritesItems',
    [],
  );

  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const data = {
    products,
    setProducts,
    productsLoading,
    setProductsLoading,
    productsError,
    setProductsError,
    cartItems,
    setCartItems,
    favoritesItems,
    setFavoritesItems,
    updatedAt,
    setUpdatedAt,
    isMenuActive,
    setIsMenuActive,
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
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};
