import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { MainProvider } from './context/MainContext';
import { App } from './App';

import {
  AccessoriesPage,
  CartPage,
  ElementsPage,
  FavouritesPage,
  HomePage,
  PhonesPage,
  TabletsPage,
} from './pages';

export const Root = () => (
  <Router>
    <MainProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="elements" element={<ElementsPage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </MainProvider>
  </Router>
);
