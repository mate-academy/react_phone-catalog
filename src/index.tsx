import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';
import { RightsPage } from './pages/RightsPage/RightsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/rights" element={<RightsPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root'),
);
