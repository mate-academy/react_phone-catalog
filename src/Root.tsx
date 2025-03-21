import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { CardPage } from './components/BuyCard/CartPage';
import { FavouritesPage } from './components/Favourites/Favourites';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { ProductPage } from './components/ProductPage/ProductPage';
// eslint-disable-next-line max-len
import { ProductInformation } from './components/ProductInformation/ProductInformation';
import { FavoritesProvider } from './components/Favourites/FacouritesContext';

export const Root = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="phones" element={<ProductPage />} />
            <Route path="tablets" element={<ProductPage />} />
            <Route path="accessories" element={<ProductPage />} />
            <Route path=":category">
              <Route index element={<ProductPage />} />
              <Route path=":productId" element={<ProductInformation />} />
            </Route>
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CardPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};
