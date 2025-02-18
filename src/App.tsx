import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import DetailsPage from './modules/DetailsPage';
import ProductPage from './modules/ProductPage';
import HomePage from './modules/HomePage';
import NotFoundPage from './modules/NotFoundPage';
import CartPage from './modules/CartPage';
import FavoritePage from './modules/FavoritePage';

export const App = () => {
  const categories = ['phones', 'tablets', 'accessories'];

  const showCategories = categories.map((category, index) => (
    <React.Fragment key={index}>
      <Route
        path={`/${category}`}
        element={<ProductPage category={`${category}`} />}
      />
      <Route
        path={`/${category}/:device`}
        element={<DetailsPage category={category} />}
      />
    </React.Fragment>
  ));

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {showCategories}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
