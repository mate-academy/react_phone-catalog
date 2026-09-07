import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './Components/NotFoundPage';
import { Homepage } from './Components/Homepage/Homepage';
import { PhonesPage } from './Components/PhonesPage/PhonesPage';
import { TabletPage } from './Components/TabletPage/TabletPage';
import { AccessoriesPage } from './Components/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from './Components/FavouritesPage/FavouritesPage';
import { ItemCard, ProductType } from './Components/ItemCard/ItemCard';
import { CartPage } from './Components/CartPage/CartPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />

          <Route path="phones" element={<PhonesPage />} />
          <Route
            path="phones/:id"
            element={<ItemCard type={ProductType.PHONE} />}
          />
          <Route path="tablets" element={<TabletPage />} />
          <Route
            path="tablets/:id"
            element={<ItemCard type={ProductType.TABLET} />}
          />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route
            path="accessories/:id"
            element={<ItemCard type={ProductType.ACCESSORY} />}
          />

          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
