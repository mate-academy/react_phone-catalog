import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import style from './App.module.scss';
import '../../styles/theme.scss';
import '../../styles/main.scss';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { useContext, useEffect } from 'react';
import { MobileMenu } from '../../components/MobileMenu';
import { StateContext } from '../../components/GlobalProvider';
import { Loader } from '../../components/Loader';

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
};

export const App = () => {
  const { showMenu, loading } = useContext(StateContext);

  return (
    <div
      className={classNames(style.container)}
      id="top"
    >
      <ScrollToTop />

      <div className={classNames(style.container_header)}>
        <Header />
      </div>

      <div className={classNames(style.container_mobile_menu)}>
        <MobileMenu />
      </div>

      {!showMenu && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className={classNames(style.container_body)}>
              <Outlet />
            </div>
          )}

          <div className={classNames(style.container_footer)}>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};
