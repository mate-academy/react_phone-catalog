// import { Header } from '@Header';
// import { HomePage } from '@HomePage';
// import { Footer } from '@GlobalComponents';

import { Outlet } from 'react-router-dom';

import './assets/styles/main.scss';
import { Header } from '@Header';
import { Footer } from '@GlobalComponents';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
