import { Layout } from '../Layout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { FavoritesPage } from '../../pages/FavoritesPage';
import { CartPage } from '../../pages/CartPage';
import { AppRoutes } from './AppRoutes';
import { ItemCardPage } from '../../pages/ItemCardPage';
import { PhonesPage } from '../../pages/PhonesPage';
import { TabletsPage } from '../../pages/TabletsPage';
import { AccessoriesPage } from '../../pages/AccessoriesPage';
import { ContactsPage } from '../../pages/ContactsPage';
import { RightsPage } from '../../pages/RightsPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path={AppRoutes.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={AppRoutes.FAVORITE} element={<FavoritesPage />} />
        <Route path={AppRoutes.PHONES} element={<PhonesPage />}></Route>
        <Route path={AppRoutes.TABLETS} element={<TabletsPage />}></Route>
        <Route
          path={AppRoutes.ACCESSORIES}
          element={<AccessoriesPage />}
        ></Route>
        <Route path={AppRoutes.CART} element={<CartPage />} />
        <Route path={AppRoutes.CONTACTS} element={<ContactsPage />} />
        <Route path={AppRoutes.RIGHTS} element={<RightsPage />} />
        <Route
          path={`${AppRoutes.PHONES}/:productId`}
          element={<ItemCardPage category={'phones'} />}
        />
        <Route
          path={`${AppRoutes.TABLETS}/:productId`}
          element={<ItemCardPage category={'tablets'} />}
        />
        <Route
          path={`${AppRoutes.ACCESSORIES}/:productId`}
          element={<ItemCardPage category={'accessories'} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
