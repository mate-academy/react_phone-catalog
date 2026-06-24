import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import './styles/fonts.scss';
import './App.scss';
import { FavoriteProvider } from './shared/contexts/FavoriteContext';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartProvider } from './shared/contexts/CartContext';
import { CartPage } from './modules/CartPage/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { ROUTES } from './shared/constants';

export const App = () => (
  <CartProvider>
    <FavoriteProvider>
      <HashRouter>
        <div className="app-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.PHONES} element={<PhonesPage />} />
              <Route path={ROUTES.TABLETS} element={<TabletsPage />} />
              <Route path={ROUTES.ACCESSORIES} element={<AccessoriesPage />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
              <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
              <Route path={ROUTES.CART} element={<CartPage />} />
              <Route path="/product/:itemId" element={<ProductDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </FavoriteProvider>
  </CartProvider>
);
