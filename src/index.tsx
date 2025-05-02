import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import HomePage from './modules/HomePage';
import PhonesPage from './modules/pages/Phones';
import TabletsPage from './modules/pages/Tablets';
import AccessoriesPage from './modules/pages/Accessories';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
      </Route>
    </Routes>
  </Router>,
);
