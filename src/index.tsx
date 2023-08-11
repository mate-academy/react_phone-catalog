import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { App } from './App';
import { CartPage } from './pages/CartPage';
import { GlobalStateProvider } from './components/Store';
import { FavoritesPage } from './pages/FavoritesPage';
import { PageNotFound } from './pages/PageNotFound';

const Root = () => (
  <GlobalStateProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":phoneId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />

          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>

      </Routes>
    </Router>
  </GlobalStateProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
