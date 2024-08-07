import './App.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getAccessories,
  getAllProducts,
  getPhones,
  getTablets,
} from '../../api/products';
import { productsSlice } from '../../features/products';
import { useAppDispatch } from '../../app/hooks';
import { Product } from '../../types/Product';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAndMergeData = async () => {
      try {
        const products = await getAllProducts().then(response => response);
        const responses = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        const updatedProducts = products.map((item: Product) => {
          const apiData = responses
            .flat()
            .find(productData => productData.id === item.itemId);

          if (apiData) {
            return { ...item, data: apiData };
          }

          return item;
        });

        dispatch(productsSlice.actions.setProducts(updatedProducts));
      } catch (error) {}
    };

    fetchAndMergeData();
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
