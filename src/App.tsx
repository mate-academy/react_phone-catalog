//hooks
import { useEffect, useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { useIsFetching } from '@tanstack/react-query';

//react-router
import { Navigate, Route, Routes } from 'react-router-dom';

//react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//style
import './styles/Reset.scss';
import styles from './App.module.scss';

//components
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { ErrorBanner } from './components/ErrorBanner/ErrorBanner';

//pages
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';

//services
import { FavouritesContext } from './services/FavouritesContext';
import { CartContext } from './services/CartContext';
import classNames from 'classnames';

const queryClient = new QueryClient();

const AppContent = () => {
  const isFetching = useIsFetching();
  const { isError } = useProducts();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline || isError) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOnline, isError]);

  return (
    <>
      <p
        className={classNames(styles.refetch, {
          [styles['refetch--active']]: isFetching,
        })}
      >
        Updating...
      </p>

      <NavBar />

      {(!isOnline || isError) && (
        <ErrorBanner
          message={!isOnline ? 'No Connection' : 'Something went wrong...'}
          className={styles.error}
        />
      )}
      <div className={styles.content}>
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<CatalogPage productsType={'phones'} />}
          />
          <Route path="/phones/:productId" element={<ProductPage />} />
          <Route
            path="/tablets"
            element={<CatalogPage productsType={'tablets'} />}
          />
          <Route path="/tablets/:productId" element={<ProductPage />} />
          <Route
            path="/accessories"
            element={<CatalogPage productsType={'accessories'} />}
          />
          <Route path="/accessories/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export const App = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + '#/');
    }
  }, []);

  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <CartContext.Provider value={{ cart, setCart }}>
          <FavouritesContext.Provider value={{ favourites, setFavourites }}>
            <AppContent />
          </FavouritesContext.Provider>
        </CartContext.Provider>
      </QueryClientProvider>
    </div>
  );
};
