import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';
import { useSetProducts } from './context/ProductsContext';
import { getProducts } from './httpClient';
import { Loader } from './components/Loader';
import { Menu } from './components/Menu';
import { MenuProvider } from './context/MenuContext';
import { useError, useSetError } from './context/ErrorContext';

export const App = () => {
  const setProducts = useSetProducts();
  const [loading, setIsLoading] = useState(false);
  const setError = useSetError();
  const error = useError();

  useEffect(() => {
    setError('');
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setError('Something went wrong :('))
      .finally(() => setIsLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="page-title">Product Catalog</h1>
      <MenuProvider>
        <Header />
        <Menu />
      </MenuProvider>
      <main className="main">{error ? <h2>{error}</h2> : <Outlet />}</main>
      <Footer />
    </>
  );
};
