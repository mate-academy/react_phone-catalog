import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonePage } from './modules/PhonePage/PhonePage';
import { PageNotFound } from './modules/PageNOTFound/PageNotFound';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { TabletPage } from './modules/TabletPage/TabletPage';
import { DetailsProduct } from './modules/DetailsPage/DetailsProduct';
import { Cart } from './modules/CartPage/Cart';
import { FavouritePage } from './modules/FavoritePage/FavouritePage';
import { ScrollToTop } from './components/scrollToTop/scrollToTop';

export const Root = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />

          <Route path=":category/:productId" element={<DetailsProduct />} />

          <Route path="phones" element={<PhonePage />} />
          <Route path="tablets" element={<TabletPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favourites" element={<FavouritePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
