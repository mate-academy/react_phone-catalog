import './App.scss';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { Header } from './modules/shared/Header/Header';
import { Footer } from './modules/shared/Footer/Footer';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { ScrollToTop } from './modules/shared/ScrollToTop/ScrollToTop';
import { ToastProvider } from './context/ToastContext';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <main className="main">
      <div className="page-transition" key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:productId" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route
            path="/accessories/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  );
};

export const App = () => (
  <ThemeProvider>
    <CartProvider>
      <FavoritesProvider>
        <ToastProvider>
          <HashRouter>
            <div className="app">
              <Header />

              <ScrollToTop />

              <AppRoutes />

              <Footer />
            </div>
          </HashRouter>
        </ToastProvider>
      </FavoritesProvider>
    </CartProvider>
  </ThemeProvider>
);
