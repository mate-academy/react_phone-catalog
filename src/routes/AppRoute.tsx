import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage/HomePage';
import { PhonesPage } from '../pages/PhonesPage/PhonePage';
import { ProductProvider } from '../context/ProductContext';

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
        </Route>
      </Routes>
    </Router>
  </ProductProvider>
);
