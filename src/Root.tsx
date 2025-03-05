import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { AccessoriesPage } from './components/AccessoriesPage';
import { CardPge } from './components/CartPage';
import { FavouritesPage } from './components/Favourites';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PhonesPage } from './components/PhonePage/PhonePage';
import { TabletsPage } from './components/TabletPage';
// eslint-disable-next-line max-len
import { ProductInformation } from './components/ProductInformation/ProductInformation';
// import { Sidebar } from './components/Sidebar';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductInformation />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
          </Route>
          <Route path="favourites">
            <Route index element={<FavouritesPage />} />
          </Route>
          <Route path="cart">
            <Route index element={<CardPge />} />
          </Route>
          {/* <Route path="menu">
            <Route index element={<Sidebar />} />
          </Route> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
