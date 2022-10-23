import ReactDOM from 'react-dom';
import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import './global.scss';
import { HomePage } from './pages/HomePage';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { NotFoundPage } from './pages/NotFoundPage';
import App from './App';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<HomePage />} />
        <Route path="phones" element={<Phones />} />
        <Route path="tablets" element={<Tablets />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </Router>,

  document.getElementById('root'),
);
