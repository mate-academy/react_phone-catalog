import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PhonePage } from './pages/PhonesPage';
import { TabletPage } from './pages/TabletsPage';
import { FavouritePage } from './pages/FavouritePage';
import { CartPage } from './pages/CartPage';
import { AccessooriesPage } from './pages/AccessoriesPage';
import { App } from './App';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonePage />} />
        <Route path="/tablets" element={<TabletPage />} />
        <Route path="/accessories" element={<AccessooriesPage />} />
        <Route path="/favorite" element={<FavouritePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
};
