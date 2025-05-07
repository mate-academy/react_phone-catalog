import './App.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllProducts } from '../../api/products';
import { productsSlice } from '../../features/products';
import { useAppDispatch } from '../../app/hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts().then(response => response);

        dispatch(productsSlice.actions.setProducts(products));
      } catch (error) {}
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
