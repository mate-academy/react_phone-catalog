import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { FavouriteProductsProvider } from './store/FavouriteProductsContext';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartProvider } from './store/CartContext';

const categories = ['phones', 'tablets', 'accessories'];

export const Root = () => {
  return (
    <Router>
      <FavouriteProductsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />

              {categories.map(category => (
                <Route path={category} key={category}>
                  <Route
                    index
                    element={<CatalogPage productType={category} />}
                  />
                  <Route
                    path=":productId"
                    element={<ProductDetailsPage productType={category} />}
                  />
                </Route>
              ))}

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </FavouriteProductsProvider>
    </Router>
  );
};
