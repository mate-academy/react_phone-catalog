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

export const App = () => {
  const setProducts = useSetProducts();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="page-title">Product catalog</h1>
      <MenuProvider>
        <Header />
        <Menu />
      </MenuProvider>
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
