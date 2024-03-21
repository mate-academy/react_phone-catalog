import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { AccessoriesPage } from './components/AccesoriesPage';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { App } from './App';
import { GlobalStateProvider } from './store/ProductsContext';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { FavouritesPage } from './components/FavouritesPage';

export const Root = () => (
  <Router>
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="favourites">
            <Route index element={<FavouritesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="*" element={<p>Not found</p>} />
        </Route>
      </Routes>
    </GlobalStateProvider>
  </Router>
);
