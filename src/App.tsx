import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './features/Header';
import { Footer } from './features/Footer';
import classNames from 'classnames';

export const App = () => {
  return (
    <div className={classNames('App')}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
