import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import './App.module.scss';
import { HomePage } from './pages/HomePage/Home';
import { Phones } from './pages/Phones/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { NotFound } from './pages/NotFound';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<Phones />} />
          <Route path=":slug" element={<Phones />} />
        </Route>
        <Route path="tablets">
          <Route index element={<Tablets />} />
          <Route path=":slug" element={<Tablets />} />
        </Route>
        <Route path="accessories">
          <Route index element={<Accessories />} />
          <Route path=":slug" element={<Accessories />} />
        </Route>
        <Route path="favorites">
          <Route index element={<Favorites />} />
          <Route path=":slug" element={<Favorites />} />
        </Route>
        <Route path="cart">
          <Route index element={<Cart />} />
          <Route path=":slug" element={<Cart />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
