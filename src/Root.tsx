import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { FavouritesProvider } from './components/Favourites/FavouritesContext';
import { CartProvider } from './components/Cart/CartContext';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import {
  AccessoriesPage,
  PhonesPage,
  TabletsPage,
  CartPage,
  DetailsPage,
  FavouritesPage,
} from './utils/lazyComponents';
import { Suspense } from 'react';
import { Loader } from './components/Loader/Loader';

export const Root = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<Loader />}>
                      <HomePage />
                    </Suspense>
                  }
                />
                <Route path="home" element={<Navigate to={'/'} replace />} />
                <Route
                  path="phones"
                  element={
                    <Suspense fallback={<Loader />}>
                      <PhonesPage url="phones" />
                    </Suspense>
                  }
                >
                  <Route
                    path=":productId"
                    element={
                      <Suspense fallback={<Loader />}>
                        <DetailsPage />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="accessories"
                  element={
                    <Suspense fallback={<Loader />}>
                      <AccessoriesPage url="accessories" />
                    </Suspense>
                  }
                >
                  <Route
                    path=":productId"
                    element={
                      <Suspense fallback={<Loader />}>
                        <DetailsPage />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="tablets"
                  element={
                    <Suspense fallback={<Loader />}>
                      <TabletsPage url="tablets" />
                    </Suspense>
                  }
                >
                  <Route
                    path=":productId"
                    element={
                      <Suspense fallback={<Loader />}>
                        <DetailsPage />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="favourites"
                  element={
                    <Suspense fallback={<Loader />}>
                      <FavouritesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <Suspense fallback={<Loader />}>
                      <CartPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </FavouritesProvider>
  );
};
