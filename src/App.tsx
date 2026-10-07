import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Header } from './components/Header';

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className="app">
      <SkeletonTheme
        baseColor={theme === 'dark' ? '#222533' : '#E2E6E9'}
        highlightColor={theme === 'dark' ? '#32364a' : '#F0F2F5'}
      >
        <ProductsProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header />
              <Outlet />
              <Footer />
            </FavoritesProvider>
          </CartProvider>
        </ProductsProvider>
      </SkeletonTheme>
    </div>
  );
};

export const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);
