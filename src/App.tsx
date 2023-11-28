import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';
import './App.scss';

import { MainContext } from './context/MainContext';

import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';

export const App = () => {
  const { isLoaderActive, isHeaderSearchVisible } = useContext(MainContext);

  return (
    <div className="App">
      <Header />

      {isLoaderActive && <Loader />}

      <main
        id="top"
        className={cn('main', { 'main--margin-2': isHeaderSearchVisible })}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
