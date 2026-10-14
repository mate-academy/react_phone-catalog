import './App.scss';
import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';

const HomePage = lazy(() =>
  import('./components/HomePage').then(module => ({
    default: module.HomePage,
  })),
);
const CatalogPage = lazy(() =>
  import('./components/CatalogPage').then(module => ({
    default: module.CatalogPage,
  })),
);
const ProductDetailsPage = lazy(() =>
  import('./components/ProductDetailsPage').then(module => ({
    default: module.ProductDetailsPage,
  })),
);
const CartPage = lazy(() =>
  import('./components/CartPage').then(module => ({
    default: module.CartPage,
  })),
);
const FavoritesPage = lazy(() =>
  import('./components/FavoritesPage').then(module => ({
    default: module.FavoritesPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage').then(module => ({
    default: module.NotFoundPage,
  })),
);

const PageContent = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={event => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<CatalogPage category="phones" />} />
            <Route
              path="/tablets"
              element={<CatalogPage category="tablets" />}
            />
            <Route
              path="/accessories"
              element={<CatalogPage category="accessories" />}
            />
            <Route path="/product/:itemId" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export const App = () => (
  <HashRouter>
    <ShopProvider>
      <PageContent />
    </ShopProvider>
  </HashRouter>
);
