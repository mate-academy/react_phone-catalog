import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { RoutesLink } from './types/routes';
import { HomePage } from './pages/HomePage';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { FavoritePage } from './pages/FavoritePage';
import { ProductPage } from './pages/ProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageTransitionProvider } from './providers/PageTransitionProvider';

export const Root = () => {
  return (
    <HashRouter>
      <PageTransitionProvider>
        <Routes>
          <Route path={RoutesLink.HomePage} element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:category" element={<ProductPage />} />
            <Route path="/:category/:id" element={<ProductDetails />} />
            <Route path={RoutesLink.CartPage} element={<CartPage />} />
            <Route path={RoutesLink.FavoritesPage} element={<FavoritePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PageTransitionProvider>
    </HashRouter>
  );
};
