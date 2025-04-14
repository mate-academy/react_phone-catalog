import { Outlet } from 'react-router-dom';

import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
