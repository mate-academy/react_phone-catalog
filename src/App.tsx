import './App.scss';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import AsideMenu from './components/AsideMenu/AsideMenu';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Product } from './types/products';
import { loadProducts, settingsSlice } from './features/settingsSlice';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
// import { syncCart } from './features/cartSlice';
// import { syncFavourites } from './features/favouritesSlice';
// import { storage, StorageKey } from './app/localStorage';

export const App = () => {
  const productsFromRedux = useAppSelector(state => state.store.products);
  const dispatch = useAppDispatch();
  const [storedProducts, setStoredProducts] = useLocalStorage<Product[]>(
    [],
    'products',
  );

  // useEffect(() => {
  //   const handleStorageSync = (
  //     e: StorageEvent | CustomEvent<{ key: StorageKey }>,
  //   ) => {
  //     if (e instanceof StorageEvent) {
  //       if (e.key === 'cart') {
  //         dispatch(syncCart());
  //       }
  //     }

  //     if (e instanceof CustomEvent && e.type === 'localStorageChange') {
  //       const key = e.detail.key;

  //       if (key === 'cart') {
  //         dispatch(syncCart());
  //       }

  //       if (key === 'favourites') {
  //         const newFavs = storage.getAllItems<string>('favourites') || [];

  //         dispatch(syncFavourites(newFavs));
  //       }
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageSync);
  //   window.addEventListener(
  //     'localStorageChange',
  //     handleStorageSync as EventListener,
  //   );

  //   return () => {
  //     window.removeEventListener('storage', handleStorageSync);
  //     window.removeEventListener(
  //       'localStorageChange',
  //       handleStorageSync as EventListener,
  //     );
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (storedProducts.length === 0) {
      dispatch(loadProducts());
    } else {
      dispatch(settingsSlice.actions.setProducts(storedProducts));
    }
  }, [storedProducts, dispatch]);

  useEffect(() => {
    if (productsFromRedux.length > 0) {
      setStoredProducts(productsFromRedux);
    }
  }, [productsFromRedux, setStoredProducts]);

  return (
    <div className="App">
      <h1 className="hidden">Nice Gadgets</h1>
      <HeaderMenu />
      <AsideMenu />

      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
