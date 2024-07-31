export * from './App';

import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/components';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Catalog } from './modules/CatalogPage/components/Catalog';
import { Favorites } from './modules/FavoritesPage/components';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<Catalog />} />
          <Route path="tablets" element={<Catalog />} />
          <Route path="accessories" element={<Catalog />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Provider>,
);
