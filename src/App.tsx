import './App.scss';
import React from 'react';
import {
  Outlet,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { Header } from './Components/Header/Header';
import './Helpers/container.scss';
import { Footer } from './Components/Footer/Footer';
import { HomePage } from './Pages/HomePage/HomePage';
import { PhonePage } from './Pages/PhonePage/PhonePage';
import { TabletsPage } from './Pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './Pages/AccessoriesPage/AccessoriesPage';
import {
  ProductDetailsPage,
} from './Pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './Pages/CartPage/CartPage';
import { CartProvider } from './Helpers/CartContex';
import { SearchProvider } from './Helpers/SearchContext';
import { FavProvider } from './Helpers/FavContex';
import { FavoritesPage } from './Pages/FavoritesPage/FavoritesPage';

export const App: React.FC = () => (
  <CartProvider>
    <SearchProvider>
      <FavProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="app__main">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Outlet />} />
                  <Route index element={<HomePage />} />
                  <Route path="phones" element={<PhonePage />} />
                  <Route path="tablets" element={<TabletsPage />} />
                  <Route path="accessories" element={<AccessoriesPage />} />
                  <Route
                    path="product/:productId"
                    element={<ProductDetailsPage />}
                  />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="favourites" element={<FavoritesPage />} />
                  <Route
                    path="*"
                    element={<h1 className="title">Page not found</h1>}
                  />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </FavProvider>
    </SearchProvider>
  </CartProvider>
);
