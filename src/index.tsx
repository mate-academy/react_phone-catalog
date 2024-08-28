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

// eslint-disable-next-line max-len
import { GlobalProvider } from './components/shared/GlobalContext/GlobalContext';
import { HomePage } from './components/Pages/HomePage';
import { PhonesPage } from './components/Pages/PhonesPage';
import { TabletsPage } from './components/Pages/TabletsPage';
import { AccessoriesPage } from './components/Pages/AccessoriesPage';
import { FavouritesPage } from './components/Pages/FavouritesPage';
import { CartPage } from './components/Pages/CartPage';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { CardDetails } from './components/Pages/CardDetails/CardDetails';
import { Contacts } from './components/shared/Contacts/Contacts';
import { RightsPage } from './components/shared/Rights/Rights';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />}>
            <Route path=":itemId" element={<CardDetails />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />}>
            <Route path=":itemId" element={<CardDetails />} />
          </Route>
          <Route path="accessories" element={<AccessoriesPage />}>
            <Route path=":itemId" element={<CardDetails />} />
          </Route>
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="contacts" element={<Contacts />} />
          <Route path="rights" element={<RightsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </GlobalProvider>,
);
