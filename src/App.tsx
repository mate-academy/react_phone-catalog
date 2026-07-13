import './App.scss';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { NotFoundPage } from './modules/NotFoundPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CatalogPage } from './modules/CatalogPage';
import { HomePage } from './modules/HomePage';
import { CartProvider } from './modules/shared/context/CartContext';
import { CartPage } from './modules/CartPage';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { FavoritesPage } from './modules/FavoritesPage';

const CategoryGuard = () => {
  const { category } = useParams();
  const validCategories = ['phones', 'tablets', 'accessories'];

  if (category && !validCategories.includes(category)) {
    return <NotFoundPage />;
  }

  return <Outlet />;
};

export const App = () => (
  <CartProvider>
    <FavoritesProvider>
      <div className="App">
        <Header />

        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<CategoryGuard />}>
              <Route path="/:category" element={<CatalogPage />} />
            </Route>
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </FavoritesProvider>
  </CartProvider>
);
