import React from 'react';
import {
  createHashRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.scss';

import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppLayout: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'phones',
        element: <ProductsPage category="phones" title="Phones" />,
      },
      {
        path: 'tablets',
        element: <ProductsPage category="tablets" title="Tablets" />,
      },
      {
        path: 'accessories',
        element: <ProductsPage category="accessories" title="Accessories" />,
      },
      {
        path: 'product/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'not-found',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <Navigate to="/not-found" replace />,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <RouterProvider router={router} />
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
