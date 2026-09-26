import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';
import { RightsPage } from './pages/RightsPage/RightsPage';
import { Favourites } from './components/Favourites/Favourites';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Cart } from './components/Cart/Cart';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="product/:productId" element={<ProductDetailsPage />} />

        <Route path="contacts" element={<ContactsPage />} />
        <Route path="rights" element={<RightsPage />} />
        <Route path="favorites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="/menu" element={<MobileMenu />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
