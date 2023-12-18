import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { MainProvider } from './context/MainContext';
import { App } from './App';

import {
  AccessoriesPage,
  CartPage,
  ElementsPage,
  FavouritesPage,
  HomePage,
  NotFoundPage,
  PhonesPage,
  ProductDetailsPage,
  TabletsPage,
} from './pages';
import { SearchResult } from './pages/SearchResult';

export const Root = () => (
  <Router>
    <MainProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="elements" element={<ElementsPage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="*" element={<NotFoundPage title="Page not found" />} />
        </Route>
      </Routes>
    </MainProvider>
  </Router>
);
