import styles from './App.module.scss';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Header } from './modules/shared/components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  accessoriesPath,
  alternateHomePath,
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

        <Route
          path={phonesPath}
          element={<ProductsPage productCategory={Category.Phones} />}
        />

        <Route
          path={tabletsPath}
          element={<ProductsPage productCategory={Category.Tablets} />}
        />

        <Route
          path={accessoriesPath}
          element={<ProductsPage productCategory={Category.Accessories} />}
        />

        <Route path={settingsPath} element={<SettingsPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>

      <Footer className={styles.Footer} />
    </div>
  );
};
