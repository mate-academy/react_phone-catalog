import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './modules/HomePage/HomePage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ProductPage } from './modules/ProductPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { Contacts } from './modules/Contacts';
import { Rights } from './modules/Rights';
import { EmptyState } from './components/EmptyState';
import pageNotFound from '/img/page-not-found.png';

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="phones">
            <Route index element={<ProductPage category="phones" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<ProductPage category="tablets" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<ProductPage category="accessories" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="rights" element={<Rights />} />
          <Route path="*" element={<EmptyState image={pageNotFound} message="Page not found" />} />
        </Route>
      </Routes>
    </>
  );
};
