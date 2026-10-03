import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { HomePage } from './shared/components/HomePage';
import { CatalogPage } from './shared/components/CatalogPage';
import { ProductDetailsPage } from './shared/components/ProductDetailsPage';
import { CartPage } from './shared/components/CartPage';
import { FavoritesPage } from './shared/components/FavoritesPage';
import { CartProvider, FavoritesProvider } from './shared/context';

const NotFoundPage = () => (
  <div style={{ padding: '64px 16px', textAlign: 'center' }}>
    <h2>Page not found</h2>
    <Link to="/" style={{ color: '#4219d0', fontWeight: 700 }}>
      Go to Home
    </Link>
  </div>
);

export const App = () => {
  return (
    <HashRouter>
      <FavoritesProvider>
        <CartProvider>
          <div
            className="App"
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                  path="/phones"
                  element={
                    <CatalogPage title="Mobile phones" category="phones" />
                  }
                />
                <Route
                  path="/tablets"
                  element={<CatalogPage title="Tablets" category="tablets" />}
                />
                <Route
                  path="/accessories"
                  element={
                    <CatalogPage title="Accessories" category="accessories" />
                  }
                />

                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />

                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </HashRouter>
  );
};
