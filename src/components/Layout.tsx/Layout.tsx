import { Route, Routes } from 'react-router-dom';
import { CartPage } from '../../pages/CartPage';
import { FavouritesPage } from '../../pages/FavoritesPage';
import { Home } from '../../pages/Home';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PhonesPage } from '../../pages/PhonesPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { TabletsPage } from '../../pages/TabletsPage';
import { Footer } from '../Footer';
import { Header } from '../Header';

import { AccessoriesPage } from '../../pages/AccessoriesPage';
import './Layout.scss';

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />

      <div className="layout__main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="phones">
            <Route index element={<PhonesPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage category="Phones" />}
            />

            <Route path=":slug" element={<PhonesPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage category="Tablets" />}
            />

            <Route path=":slug" element={<PhonesPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />

            <Route
              path=":productId"
              element={<ProductDetailsPage category="Accessories" />}
            />

            <Route path=":slug" element={<AccessoriesPage />} />
          </Route>

          <Route path="cart" element={<CartPage />} />

          <Route path="favourites" element={<FavouritesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};
