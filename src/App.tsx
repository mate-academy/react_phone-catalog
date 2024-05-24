import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
// import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { GlobalProvider } from './GlobalContext';

import classes from './App.module.scss';

export const App = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <GlobalProvider>
      <div className={classes.App}>
        <div className={classes.App__container}>
          <div className={classes.App__header}>
            <Header />
          </div>
          <div className={classes.App__content}>
            <Outlet />
          </div>
          {/* <Footer /> */}
          Footer
        </div>
      </div>
    </GlobalProvider>
  );
};
