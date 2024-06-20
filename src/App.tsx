import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

import './App.scss';
import { PageLayout } from './layouts/PageLayout';
import { CartProvider } from './store/CartProvider';
import { FavoritesProvider } from './store/FavoritesProvider';

export const App = () => (
  <div className="App">
    <FavoritesProvider>
      <CartProvider>
        <Header />

        <PageLayout>
          <Outlet />
        </PageLayout>

        <ToastContainer />
        <Footer />
      </CartProvider>
    </FavoritesProvider>
  </div>
);
