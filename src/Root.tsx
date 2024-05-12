/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { App } from './App';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';
import PhonePage from './pages/PhonePage/PhonePage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import CartPage from './pages/CartPage/CartPage';
import { Product } from './types/Product';
import { getAllProudct } from './helpers/helpers';
import StoreProvider from './store/Store';
import Contacts from './pages/Contacts/Contacts';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Root: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getAllProudct();

        const phonesData = allProducts.filter(
          product => product.category === 'phones',
        );
        const tabletsData = allProducts.filter(
          product => product.category === 'tablets',
        );
        const accessoriesData = allProducts.filter(
          product => product.category === 'accessories',
        );

        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <HashRouter>
      <StoreProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="tablets" element={<TabletsPage product={tablets} />} />
            <Route
              path="accessories"
              element={<AccessoriesPage product={accessories} />}
            />
            <Route path="phones" element={<PhonePage product={phones} />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StoreProvider>
    </HashRouter>
  );
};

export default Root;
