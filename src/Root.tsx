import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PhonePage } from './Pages/PhonePage';
import { TabletsPage } from './Pages/TabletsPage';
import { AccessoriesPage } from './Pages/AccessoriesPage';
import { ItemPage } from './Pages/ItemPage';
import { FavoritesPage } from './Pages/FavoritesPage';
import { CartPage } from './Pages/CartPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';

export const Root = () => (
  <Router>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App></App>}>
        <Route index element={<HomePage></HomePage>} />
        <Route path="/phones" element={<PhonePage></PhonePage>} />
        <Route
          path="/phones/:modelId"
          element={<ItemPage kindOfModel="phones" category="Phones" />}
        />
        <Route path="/tablets" element={<TabletsPage></TabletsPage>} />
        <Route
          path="/tablets/:modelId"
          element={<ItemPage kindOfModel="tablets" category="Tablets" />}
        />
        <Route
          path="/accessories"
          element={<AccessoriesPage></AccessoriesPage>}
        />
        <Route
          path="/accessories/:modelId"
          element={
            <ItemPage kindOfModel="accessories" category="Accessories" />
          }
        />
        <Route path="/favourites" element={<FavoritesPage></FavoritesPage>} />
        <Route path="/cart" element={<CartPage></CartPage>} />
        <Route path="*" element={<NotFoundPage></NotFoundPage>} />
      </Route>
    </Routes>
  </Router>
);
