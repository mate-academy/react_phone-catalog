/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useContext } from 'react';
import { ThemeContext } from './store/ThemeContex';
import { Theme } from './types/Theme';

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="app">
      <div
        className={
          theme === Theme.Light ? 'app__container' : 'app__container--dark'
        }
      >
        <div
          className={
            theme === Theme.Light ? 'app__header' : 'app__header--dark'
          }
        >
          <Header />
        </div>
        <div className="app__main">
          <Outlet />
        </div>
        <div className="app__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};
