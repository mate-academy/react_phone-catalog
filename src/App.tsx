/* eslint-disable max-len */
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { Catalog } from './modules/Catalog/Catalog';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetails/ProductDetailsPage';
import Footer from './components/Footer';
import { FavoritesProvider } from './modules/Favorites/context/FavoritesContext';
import { Favorites } from './modules/Favorites/Favorites';
import { CartProvider } from './modules/Cart/CartContext';
import { CartPage } from './modules/Cart/CartPage';

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <HashRouter>
          <Header />
          <h1 className="appTitle">Product Catalog</h1>
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route
                path="/phones"
                element={<Catalog type={'phones'} />}
              ></Route>
              <Route
                path="/tablets"
                element={<Catalog type={'tablets'} />}
              ></Route>
              <Route
                path="/accessories"
                element={<Catalog type={'accessories'} />}
              ></Route>
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/:category/:productId"
                element={<ProductDetailsPage />}
              />
            </Routes>
          </main>
          <Footer />
        </HashRouter>
      </CartProvider>
    </FavoritesProvider>
  );
};
