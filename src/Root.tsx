import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import './shared/index.scss';
import { ProductsProvider } from './context/ProductsContext';
import { LoadingProvider } from './context/LoadingContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { CategoryPage } from './modules/CategoryPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';

export const Root: React.FC = () => (
  <LoadingProvider>
    <ProductsProvider>
      <FavouritesProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />

                <Route path=":categoryName">
                  <Route index element={<CategoryPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>

                <Route path="favourites" element={<FavouritesPage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </FavouritesProvider>
    </ProductsProvider>
  </LoadingProvider>
);
