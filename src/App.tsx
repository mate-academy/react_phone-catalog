/* eslint max-len: "off" */
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PathProvider } from './components/context/PathContext';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { CartAndFavouritesProvider } from './components/context/CartAndFavouritesContext';
import { ProductsPage } from './pages/ProductsPage';
import { ProductInfoPage } from './pages/ProductInfoPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';

export const App = () => {
  return (
    <CartAndFavouritesProvider>
      <PathProvider>
        <div className="app">
          <Header />

          <main>
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
