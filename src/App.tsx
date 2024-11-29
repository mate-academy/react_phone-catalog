import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchProducts } from './features/products';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const productsStatus = useSelector(
    (state: RootState) => state.products.status,
  );

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  useEffect(() => {
    if (currentTheme === 'dark-theme') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [currentTheme]);

  // Loading products
  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
