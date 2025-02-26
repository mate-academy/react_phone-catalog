import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { GlobalStateProvider } from './Store/Store';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';

export const Root = () => (
  <Router>
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<ProductPage />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<ProductPage />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<ProductPage />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </GlobalStateProvider>
  </Router>
);
