import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { GlobalStateProvider } from './store/GlobalStateProvider';
import { HomePage } from './pages/Home/Home.page';
import { App } from './App';
import { CatalogPage } from './pages/Catalog/Catalog.page';
import { FavoritesPage } from './pages/Favorites/Favorites.page';
import { NotFound } from './pages/NotFound/NotFound.page';
import { CartPage } from './pages/Cart/Cart.page';
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetails.page';

export const Root = () => {
  return (
    <Router>
      <GlobalStateProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/:category/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/:category" element={<CatalogPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </GlobalStateProvider>
    </Router>
  );
};
