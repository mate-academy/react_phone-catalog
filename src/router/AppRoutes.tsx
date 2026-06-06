import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../modules/home';
import { CatalogPage } from '../modules/catalog';

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="catalog">
            <Route index element={<CatalogPage />} />

            <Route
              path=":category"
              element={<CatalogPage />}
              handle={{ crumb: 'catalog' }}
            />
          </Route>
        </Route>

        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </HashRouter>
  );
};
