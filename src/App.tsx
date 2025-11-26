import { Outlet } from 'react-router-dom';

import './assets/styles/main.scss';
import { Header } from '@Header';
import { Footer } from '@GlobalComponents';
import style from './app.module.scss';

export const App = () => {
  return (
    <>
      <div className={style.wrapper}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
