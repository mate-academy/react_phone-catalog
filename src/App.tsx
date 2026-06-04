import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const App = () => (
  <HashRouter>
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
