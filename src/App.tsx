import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ContactsPage } from './modules/ContactsPage/ContactsPage';
import { RightsPage } from './modules/RightsPage/RightsPage';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones">
            <Route index element={<CatalogPage category="phones" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/tablets">
            <Route index element={<CatalogPage category="tablets" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/accessories">
            <Route index element={<CatalogPage category="accessories" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/rights" element={<RightsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
