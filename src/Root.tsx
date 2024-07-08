import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
/* eslint-disable-next-line max-len */
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage/ShoppingCartPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';

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
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<ShoppingCartPage />} />

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
