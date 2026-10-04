import './i18n/i18n';
import { Outlet } from 'react-router-dom';
import { MainLayout } from './shared/components/Layout';
import { ScrollToTop } from './shared/components/ScrollToTop';
export const App = () => {
  return (
    <>
      <ScrollToTop />

      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};
