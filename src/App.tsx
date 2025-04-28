import { Routes, Route } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import PhonePage from './pages/PhonePage/PhonePage';
import ProductsCategory from './pages/Phones/ProductsCategory';
import React from 'react';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import CartPage from './pages/CartPage/CartPage';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <h1>Product Catalog</h1>
      <header>
        <NavBar />
      </header>

      <div className="container">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/phones"
              element={<ProductsCategory type={'phones'} />}
            />
            <Route
              path="/tablets"
              element={<ProductsCategory type={'tablets'} />}
            />
            <Route
              path="/accessories"
              element={<ProductsCategory type={'accessories'} />}
            />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path={`/:category/:slug`} element={<PhonePage />} />
          </Routes>
        </main>
      </div>

      <div className="container footer-container">
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default App;
