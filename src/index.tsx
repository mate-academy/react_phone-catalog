import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Catalog } from './components/Catalog/Catalog';
import { HomePage } from './components/HomePage/HomePage';

import phonesFromServer from './api/phones.json';
import tabletsFromServer from './api/tablets.json';
import accessoriesFromServer from './api/accessories.json';
import { Menu } from './components/Menu/Menu';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="phones" element={<Catalog products={phonesFromServer} />}>
        <Route path="menu" element={<Menu />} />
      </Route>
      <Route
        path="tablets"
        element={<Catalog products={tabletsFromServer} />}
      />
      <Route
        path="accessories"
        element={<Catalog products={accessoriesFromServer} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Root />
  </Router>,
);
