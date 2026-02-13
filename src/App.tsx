import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchProducts } from './features/products';
import { SomethingWentWrong } from './components/SomethingWentWrong';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const productsStatus = useSelector(
    (state: RootState) => state.products.status,
  );

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const [hasError, setHasError] = useState(false);

  // useEffect for dynamic theme change
  useEffect(() => {
    document.documentElement.className = currentTheme;
  }, [currentTheme]);

  // Loading products
  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }

    if (productsStatus === 'failed') {
      setHasError(true);
    }
  }, [productsStatus, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="main">
        {!hasError ? <Outlet /> : <SomethingWentWrong />}
      </main>
      <Footer />
    </div>
  );
};
