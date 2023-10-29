import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage/HomePage';
import { PhonesPage } from '../pages/PhonePage/PhonesPage';
import { ProductProvider } from '../context/ProductContext';
import { TabletsPage } from '../pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../pages/AccessoriesPage/AccessoriesPage';

export const Root = () => (
  <ProductProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
        </Route>
      </Routes>
    </Router>
  </ProductProvider>
);
