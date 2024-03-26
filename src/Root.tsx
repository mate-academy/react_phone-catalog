import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { HomePage } from './Pages/HomePage/HomePage';
import { PhonesPage } from './Pages/PhonesPage/PhonesPage';
import { TabletsPage } from './Pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './Pages/AccessoriesPage/AccessoriesPage';
import {
  PhoneDetailsPage,
} from './Pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './Pages/CartPage/CartPage';
import { ItemsProvider } from './helpers/CartContext';

export const Root = () => (
  <Router>
    <ItemsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path=":productId" element={<PhoneDetailsPage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<PhoneDetailsPage />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ItemsProvider>
  </Router>
);
