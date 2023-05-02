import { Route, Routes } from 'react-router-dom';
import { Footer } from '../Footer';
import { Home } from '../../pages/Home';
import { CartPage } from '../../pages/CartPage';
import { PhonesPage } from '../../pages/PhonesPage';
import { TabletsPage } from '../../pages/TabletsPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';
import { FavouritesPage } from '../../pages/FavoritesPage';

import './Layout.scss';
import { AccessoriesPage } from '../../pages/AccessoriesPage';

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />

      <div className="layout__main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
            <Route path=":slug" element={<PhonesPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
            <Route path=":slug" element={<PhonesPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
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
