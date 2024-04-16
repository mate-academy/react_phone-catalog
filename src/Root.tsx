import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => (
  <ThemeProvider>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  </ThemeProvider>
);
