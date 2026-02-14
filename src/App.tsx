import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './features/Header';
import { Footer } from './features/Footer';
import classNames from 'classnames';
import { useContext } from 'react';
import { StateContext } from './Provider/GadgetsContext';
import { Loader } from './shared/components/Loader';

export const App = () => {
  const { isGlobalLoading } = useContext(StateContext);

  return (
    <div className={classNames('App')}>
      <h1 className="is-sr-only">Product Catalog</h1>
      {isGlobalLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};
