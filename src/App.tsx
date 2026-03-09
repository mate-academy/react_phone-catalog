/* eslint max-len: "off" */
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { CartAndFavouritesProvider } from './components/context/CartAndFavouritesContext';
import { PathProvider } from './components/context/PathContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductInfoPage } from './pages/ProductInfoPage';

export const App = () => {
  return (
    <CartAndFavouritesProvider>
      <PathProvider>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/product-not-found"
                element={<NotFoundPage type="product" />}
              />
              <Route path="/not-found" element={<NotFoundPage type="page" />} />
              <Route path=":category">
                <Route index element={<ProductsPage />} />
                <Route path=":itemId" element={<ProductInfoPage />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </PathProvider>
    </CartAndFavouritesProvider>
  );
};
