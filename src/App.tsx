import { Outlet } from 'react-router-dom';
import { Footer } from './modules/shared/components/footer';
import { Header } from './modules/shared/components/header';
import { useEffect } from 'react';
import './App.scss';
import { getAllProducts } from './api/products';
import { productsSlice } from './store/slices/products';
import { useAppDispatch, useAppSelector } from './hooks/hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts().then(response => response);

        dispatch(productsSlice.actions.setProducts(products));
      } catch (error) {}
    };

    fetchProducts();
  }, [dispatch]);

  if (!product.length) {
    return null;
  }

  return (
    <div className="App">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
