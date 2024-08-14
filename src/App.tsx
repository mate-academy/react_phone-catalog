import './App.scss';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Header } from './modules/shared/components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  alternateHomePath,
  homePath,
  settingsPath,
} from './modules/shared/consts/paths';
import { SettingsPage } from './modules/SettingsPage/components/SettingsPage';

export const App: React.FC = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path={homePath} element={<HomePage />} />

        <Route
          path={alternateHomePath}
          element={<Navigate to={homePath} replace />}
        />

        <Route path={settingsPath} element={<SettingsPage />} />
        <Route path="*" element={<div>page not found!</div>} />
      </Routes>
    </>
  );
};
