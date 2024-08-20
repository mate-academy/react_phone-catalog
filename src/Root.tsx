/* eslint-disable max-len */
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { PhonesPage } from './components/Pages/PhonesPage';
import { TabletPage } from './components/Pages/TabletsPage';
import { AccessoriesPage } from './components/Pages/AccessoriesPage';
import { FavouritesPage } from './components/Pages/FavouritesPage';
import { CartPage } from './components/Pages/CartPage';
import { ProductDetails } from './components/ProductDetails';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>

        <Route path="/tablets">
          <Route index element={<TabletPage />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>

        <Route path="/accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>

        <Route path="/favourites" element={<FavouritesPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
