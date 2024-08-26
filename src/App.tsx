import styles from './App.module.scss';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Header } from './modules/shared/components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  alternateHomePath,
  homePath,
  settingsPath,
} from './modules/shared/consts/paths';
import { SettingsPage } from './modules/SettingsPage/components/SettingsPage';
import { Footer } from './modules/shared/components/Footer';
// eslint-disable-next-line max-len
import { PageNotFoundPage } from './modules/PageNotFoundPage/components/PageNotFoundPage';

export const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Header />

      <Routes>
        <Route path={homePath} element={<HomePage />} />

        <Route
          path={alternateHomePath}
          element={<Navigate to={homePath} replace />}
        />

        <Route path={settingsPath} element={<SettingsPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>

      <Footer className={styles.Footer} />
    </div>
  );
};
