import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
      </Route>
    </Routes>
  </Router>
);
