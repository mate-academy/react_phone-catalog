import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { AccessoryItemPage } from './pages/AccessoryItemPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhoneItemPage } from './pages/PhoneItemPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletItemPage } from './pages/TabletItemPage';
import { TabletsPage } from './pages/TabletsPage';
import { ProductsProvider } from './store/ProductsContext';

export const Root = () => (
  <Router>
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />}>
            <Route path=":phoneId" element={<PhoneItemPage />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />}>
            <Route path=":tabletId" element={<TabletItemPage />} />
          </Route>
          <Route path="accessories" element={<AccessoriesPage />}>
            <Route path=":accessoryId" element={<AccessoryItemPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="catalog" element={<FavouritesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  </Router>
);
