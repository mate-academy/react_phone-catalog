import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { AppProvider } from './store';

export const Root = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route path="phones" element={<h1>Phones Page</h1>} />
          <Route path="tablets" element={<h1>Tablets Page</h1>} />
          <Route path="accessories" element={<h1>Accessories Page</h1>} />

          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </AppProvider>
);
