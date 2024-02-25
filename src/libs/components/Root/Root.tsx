/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet } from 'react-router-dom';

import { Footer } from '../Footer';
import { Header } from '../Header/Header';

import './Root.scss';

export const Root = () => {
  return (
    <div className="app">
      <Header classNames="app__header" />

      <main className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
