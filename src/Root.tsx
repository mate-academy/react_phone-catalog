import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PhonePage } from './pages/PhonesPage';
import { TabletPage } from './pages/TabletsPage';
import { FavouritePage } from './pages/FavouritePage';
import { CartPage } from './pages/CartPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { App } from './App';

import { Path } from './types/PatchName';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={Path.Home} element={<Navigate to="/" replace />} />
        <Route path={Path.Phones}>
          <Route index element={<PhonePage />} />
          {/* <Route path=":productId" element={<ProductDetails />} /> */}
        </Route>

        <Route path={Path.Tablets}>
          <Route index element={<TabletPage />} />
          {/* <Route path=":productId" element={<ProductDetails />} /> */}
        </Route>

        <Route path={Path.Accessories}>
          <Route index element={<AccessoriesPage />} />
          {/* <Route path=":productId" element={<ProductDetails />} /> */}
        </Route>

        <Route path={Path.Cart} element={<CartPage />} />

        <Route path={Path.Favourites} element={<FavouritePage />} />

      </Route>
    </Routes>
  );
};
