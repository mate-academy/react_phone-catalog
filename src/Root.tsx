import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ProductsProvider } from './context/ProductsContext';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { PhonesPage } from './pages/PhonesPage';

export const Root = () => {
  return (
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ProductsProvider>
  );
};
