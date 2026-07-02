import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';

import { App } from './App';

import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ContactsPage } from './modules/ContactsPage';
import { RightsPage } from './modules/RightsPage';
import { AddProvider } from './context/AddCartContext';

// import { App } from './App';

export const Root = () => (
  <FavoritesProvider>
    <AddProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />

            <Route path="product">
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="contacts" element={<ContactsPage />} />
            <Route path="rights" element={<RightsPage />} />

            {/* <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route> */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AddProvider>
  </FavoritesProvider>
);
