import { Suspense } from 'react';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { Outlet, Route, Routes } from 'react-router-dom';
import { LikeProvider } from './context/LikeCard';
import { CartProvider } from './context/CardContext';
import { HomePage } from './pages/HomePage';
import { ProductsPages } from './pages/ProductPages';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NoFoundPage } from './pages/NoFoundPage';
import { AsidePage } from './pages/AsidePage/AsidePage';

function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <div className="App" hidden>
          <h1>Product Catalog</h1>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export const App: React.FC = () => {
  return (
    <LikeProvider>
      <CartProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="aside" element={<AsidePage />} />
            <Route
              path="phones"
              element={<ProductsPages category="phones" />}
            />
            <Route
              path="tablets"
              element={<ProductsPages category="tablets" />}
            />
            <Route
              path="accessories"
              element={<ProductsPages category="accessories" />}
            />
            <Route path="product/:productId" element={<ProductDetailsPage />} />

            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NoFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </LikeProvider>
  );
};
