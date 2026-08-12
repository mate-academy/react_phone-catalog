import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ROUTES } from './constants/routes';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { setSystemTheme } from './store/themeSlice';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavoritesPage';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const nextSystemTheme = e.matches ? 'dark' : 'light';

      dispatch(setSystemTheme(nextSystemTheme));
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  return (
    <Routes>
      <Route path={ROUTES.home} element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path="phones"
          element={<CatalogPage category="phones" title="Mobile phones" />}
        />

        <Route
          path="tablets"
          element={<CatalogPage category="tablets" title="Tablets" />}
        />

        <Route
          path="accessories"
          element={<CatalogPage category="accessories" title="Accessories" />}
        />

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path=":category/:itemId" element={<ProductDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
