import './App.scss';
import HomePage from './modules/HomePage/HomePage';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import AsideMenu from './components/AsideMenu/AsideMenu';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Product } from './types/products';
import { loadProducts, settingsSlice } from './features/settingsSlice';

export const App = () => {
  const productsFromRedux = useAppSelector(state => state.store.products);
  const dispatch = useAppDispatch();
  const [storedProducts, setStoredProducts] = useLocalStorage<Product[]>(
    [],
    'products',
  );

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
      <HeaderMenu />
      <AsideMenu />

      <div className="container">
        <HomePage />
      </div>
    </div>
  );
};
