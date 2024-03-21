import { Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import classNames from 'classnames';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { StateContext } from './store/ProductsContext';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { isShowMenu, hieghtFooter, hieghtHeader, loading } =
    useContext(StateContext);
  const hieght = hieghtFooter + hieghtHeader;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classNames('App', { 'overflow-menu': isShowMenu })}>
      <Header />
      <Menu />

      <div
        className="container"
        style={{
          minHeight: `calc(100vh - ${hieght}px)`,
        }}
      >
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
