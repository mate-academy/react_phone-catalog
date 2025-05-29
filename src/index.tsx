import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './modules/Homepage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets';
import { Accessories } from './modules/Accessories';
import { Favourites } from './modules/Favourites';
import { Wishlist } from './modules/Wishlist';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones" element={<Phones />} />
        <Route path="tablets" element={<Tablets />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="wishlist" element={<Wishlist />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
);
