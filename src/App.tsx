import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { Header } from './components/Header/Header';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { MenuPage } from './pages/ProductDetails/MenuPage';
import './styles/style.scss';
import { Footer } from './components/Footer/Footer';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartsPage } from './pages/CartPage/CartPage';
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage';

export const App = () => {
  return (
    <div data-cy="app" className="app">
      <h1 className="visually-hidden">Product Catalog</h1>
      <Header />

      <main className="app__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="carts" element={<CartsPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path=":category/:itemId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      {/* <div className="section">
      </div> */}
    </div>
  );
};
