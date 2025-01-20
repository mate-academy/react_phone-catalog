import React from 'react';
import cn from 'classnames';
import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Menu } from './components/Menu';
import { useMenu } from './hooks/useMenu';

export const App = () => {
  const { isOpen } = useMenu();
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className={cn('app__menu', { 'app__menu--open': isOpen })}>
        <Menu />
      </div>
      <div className="app__main">
        <Outlet />
      </div>
    </div>
  );
};
