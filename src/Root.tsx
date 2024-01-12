import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonePage } from './pages/PhonePage/PhonePage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './pages/TabletPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { GlobalProvider } from './components/Context/GlobalContext';

export const Root = () => {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones">
              <Route index element={<PhonePage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
            </Route>

            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </Router>
  );
};
