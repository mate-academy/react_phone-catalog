import { Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import classNames from 'classnames';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { StateContext } from './store/ProductsContext';

export const App: React.FC = () => {
  const { isShowMenu } = useContext(StateContext);

  return (
    <div className={classNames('App', { 'overflow-menu': isShowMenu })}>
      <Header />
      <Menu />

      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
