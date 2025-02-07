import styles from './App.module.scss';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Header } from './modules/shared/components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  accessoriesPath,
  alternateHomePath,
  cartPath,
  favouritesPath,
  homePath,
  phonesPath,
  settingsPath,
  tabletsPath,
} from './modules/shared/consts/paths';
import { SettingsPage } from './modules/SettingsPage/components/SettingsPage';
import { Footer } from './modules/shared/components/Footer';
// eslint-disable-next-line max-len
import { PageNotFoundPage } from './modules/PageNotFoundPage/components/PageNotFoundPage';
// eslint-disable-next-line max-len
import { BurgerMenuProvider } from './modules/shared/components/Contexts/BurgerMenuContext';
import { ProductsPage } from './modules/ProductsPage/components/ProductsPage';
import { Category } from './modules/shared/types/enums';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/components/ProductDetailsPage';
import { CartPage } from './modules/CartPage/components/CartPage';
// eslint-disable-next-line max-len
import { FavouritesPage } from './modules/FavouritesPage/components/FavouritesPage';

export const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <BurgerMenuProvider>
        <Header />
      </BurgerMenuProvider>

      <Routes>
        <Route path={homePath} element={<HomePage />} />

        <Route
          path={alternateHomePath}
          element={<Navigate to={homePath} replace />}
        />

        <Route path={phonesPath}>
          <Route
            index
            element={
              <ProductsPage
                key={Category.Phones}
                productCategory={Category.Phones}
              />
            }
          />

          <Route
            path=":productId"
            element={<ProductDetailsPage productCategory={Category.Phones} />}
          />
        </Route>

        <Route path={tabletsPath}>
          <Route
            index
            element={
              <ProductsPage
                key={Category.Tablets}
                productCategory={Category.Tablets}
              />
            }
          />

          <Route
            path=":productId"
            element={<ProductDetailsPage productCategory={Category.Tablets} />}
          />
        </Route>

        <Route path={accessoriesPath}>
          <Route
            index
            element={
              <ProductsPage
                key={Category.Accessories}
                productCategory={Category.Accessories}
              />
            }
          />

          <Route
            path=":productId"
            element={
              <ProductDetailsPage productCategory={Category.Accessories} />
            }
          />
        </Route>

        <Route path={settingsPath} element={<SettingsPage />} />
        <Route path={favouritesPath} element={<FavouritesPage />} />
        <Route path={cartPath} element={<CartPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>

      <Footer className={styles.Footer} />
    </div>
  );
};
