import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/Footer';

import './App.scss';
import { MainHeader } from './components/MainHeader';
import { PageLayout } from './layouts/PageLayout';
import { CartProvider } from './store/CartProvider';
import { FavoritesProvider } from './store/FavoritesProvider';

export const App = () => (
  <div className="App">
    <FavoritesProvider>
      <CartProvider>
        <MainHeader />

        <PageLayout>
          <Outlet />
        </PageLayout>

        <ToastContainer />
        <Footer />
      </CartProvider>
    </FavoritesProvider>
  </div>
);
