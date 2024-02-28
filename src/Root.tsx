import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
// import { PhonesPage } from './pages/PhonesPage';
// import { TabletsPage } from './pages/TabletsPage';
// import { AccessoriesPage } from './pages/AccessoriesPage';
// import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
// import { CartPage } from './pages/CartPage';
// import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './ui/components';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." />} />
        {/* <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="favorites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
