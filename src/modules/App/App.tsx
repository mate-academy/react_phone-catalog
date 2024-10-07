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

  // useEffect(() => {
  //   const fetchAndMergeData = async () => {
  //     try {
  //       const products = await getAllProducts().then(response => response);
  //       const responses = await Promise.all([
  //         getPhones(),
  //         getTablets(),
  //         getAccessories(),
  //       ]);

  //       const updatedProducts = products.map((item: Product) => {
  //         const apiData = responses
  //           .flat()
  //           .find(productData => productData.id === item.itemId);

  //         if (apiData) {
  //           return { ...item, data: apiData };
  //         }

  //         return item;
  //       });

  //       dispatch(productsSlice.actions.setProducts(updatedProducts));
  //     } catch (error) {}
  //   };

  //   fetchAndMergeData();
  // }, [dispatch]);

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
