import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { CardPge } from './components/CartPage';
import { FavouritesPage } from './components/Favourites';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PhonesPage } from './components/PhonePage/PhonePage';
// eslint-disable-next-line max-len
import { ProductInformation } from './components/ProductInformation/ProductInformation';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<PhonesPage />} />
          <Route path="accessories" element={<PhonesPage />} />
          <Route path=":category">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductInformation />} />
          </Route>
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CardPge />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
