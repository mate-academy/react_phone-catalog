import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { fetchProducts } from './features/productsSlice';

export const DefaultRoute = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
