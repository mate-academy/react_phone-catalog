import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const App = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpenMenu]);

  return (
    <div className={classNames('app', { overflowHidden: isOpenMenu })}>
      <Header isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      <Outlet />
      <Footer />
    </div>
  );
};
