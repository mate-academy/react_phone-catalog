import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';

import { HomePage } from '../modules/HomePage';
import { PhonesPage } from '../modules/PhonesPage';
import { FavoritesPage } from '../modules/FavoritesPage';
import { CartPage } from '../modules/CartPage';
import { NotFoundPage } from '../modules/NotFoundPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';

interface AppRoutesProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ theme, toggleTheme }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout theme={theme} toggleTheme={toggleTheme} />}
      >
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="phones/:productId" element={<ProductDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="contacts"
          element={<NotFoundPage messageKey="contactsPage.message" />}
        />
        <Route
          path="rights"
          element={<NotFoundPage messageKey="rightsPage.message" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
