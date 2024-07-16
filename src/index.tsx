import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
  Route,
  Routes,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import './styles/reset.scss';
import './styles/fonts.scss';
import { HomePage } from './Pages/HomePage';
import { PhonesPage } from './Pages/PhonesPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { TabletsPage } from './Pages/TabletsPage';
import { AccessoriesPage } from './Pages/AccessoriesPage';
import { FavouritesPage } from './Pages/FavouritesPage';
import { CartPage } from './Pages/CartPage';
// eslint-disable-next-line max-len
import { GlobalProvider } from './components/shared/GlobalContext/GlobalContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </GlobalProvider>,
);
