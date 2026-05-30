import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { ProductInformationPage } from './pages/ProductInformationPage';
import ScrollToTop from './components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":itemId" element={<ProductInformationPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":itemId" element={<ProductInformationPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":itemId" element={<ProductInformationPage />} />
          </Route>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);
