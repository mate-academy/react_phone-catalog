import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Header } from './components/Header';

export const App = () => (
  <div className="app">
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <CartProvider>
        <FavoritesProvider>
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </FavoritesProvider>
      </CartProvider>
    </SkeletonTheme>
  </div>
);
