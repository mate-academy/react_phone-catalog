import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import classNames from 'classnames';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div
        className={classNames('App__container', {
          containerHidden: isMenuOpen,
        })}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
