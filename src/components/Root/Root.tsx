/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import './Root.scss';
import { Header } from '../Header/Header';

export const Root = () => {
  return (
    <div className="app">
      <Header classNames="app__header" />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
