import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import './App.scss';

export const App = () => (
  <div className="App">
    <Header />

    <main className="App__main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/phones"
          element={
            <CatalogPage
              category="phones"
              title="Phones page"
              emptyMessage="There are no phones yet"
            />
          }
        />
        <Route
          path="/tablets"
          element={
            <CatalogPage
              category="tablets"
              title="Tablets page"
              emptyMessage="There are no tablets yet"
            />
          }
        />
        <Route
          path="/accessories"
          element={
            <CatalogPage
              category="accessories"
              title="Accessories page"
              emptyMessage="There are no accessories yet"
            />
          }
        />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>

    <Footer />
  </div>
);
