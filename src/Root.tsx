import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './pages/Home';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Favouriets } from './pages/Favouriets';
import { Cart } from './pages/Cart';
import { ProductPage } from './components/ProductPage';
import { App } from './App';
import './App.scss';
import { GlobalProvider } from './utils/GlobalContext';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => (
  <Router>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="phones">
            <Route index element={<Phones />} />
            <Route path=":productId" element={<ProductPage />} />
          </Route>
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="favouriets" element={<Favouriets />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="/*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </GlobalProvider>
  </Router>
);
