import { Route, Routes } from 'react-router-dom';

import { PATHS } from '../constants';
import { RouteLayout } from '../layout';

const { HOME, FAVOURITES, PHONES, TABLETS, ACCESSORIES, CART } = PATHS;

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={HOME} element={<RouteLayout />}>
        <Route index element={<div>Home page</div>} />

        <Route path={FAVOURITES} element={<div>Favorites list</div>} />

        <Route path={CART} element={<div>Cart list</div>} />

        <Route path={PHONES.LIST}>
          <Route index element={<div>Phones List</div>} />
          <Route
            path={PHONES.DETAILS}
            element={<div>Single Phone Details</div>}
          />
        </Route>

        <Route path={TABLETS.LIST}>
          <Route index element={<div>Tablets List</div>} />
          <Route
            path={TABLETS.DETAILS}
            element={<div>Single Tablet Details</div>}
          />
        </Route>

        <Route path={ACCESSORIES.LIST}>
          <Route index element={<div>Accessories List</div>} />
          <Route
            path={ACCESSORIES.DETAILS}
            element={<div>Single Accessories Details</div>}
          />
        </Route>

        <Route path="*" element={<div>Not found page</div>} />
      </Route>
    </Routes>
  );
};
