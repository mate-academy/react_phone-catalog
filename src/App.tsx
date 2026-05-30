import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { Loader } from './components/Loader';
import { Menu } from './components/Menu';
import { MenuProvider } from './context/MenuContext';
import { fetchProducts } from './store/products';
import { useAppDispatch, useAppSelector } from './hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
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
