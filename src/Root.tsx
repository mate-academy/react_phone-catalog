import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { MainNavigation } from './utils/constants';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={MainNavigation.PHONES} element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="favourites" element={<HomePage />} />
        <Route path="cart" element={<HomePage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Route>
    </Routes>
  );
};
