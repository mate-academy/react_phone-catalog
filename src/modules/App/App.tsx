import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import style from './App.module.scss';
import '../../styles/theme.scss';
import '../../styles/main.scss';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { useContext, useEffect, useState } from 'react';
import { MobileMenu } from '../../components/MobileMenu';
import { DispatchContext, StateContext } from '../../components/GlobalProvider';
import { Loader } from '../../components/Loader';
import { getProducts } from '../../utils/getProducts';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
};

export const App = () => {
  const { showMenu } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(() => true);
    getProducts
      .fetchProducts()
      .then(res => {
        dispatch({ type: 'setProducts', payload: res });
      })
      .finally(() => setLoading(() => false));
  }, [dispatch]);

  return (
    <div
      className={classNames(style.container)}
      id="top"
    >
      <ScrollToTop />

      <h1 hidden>Product Catalog</h1>

      <div className={classNames(style.container_header)}>
        <Header />
      </div>

      <div className={classNames(style.container_mobile_menu)}>
        <MobileMenu />
      </div>

      {!showMenu && (
        <>
          {loading ? (
            <div className="loader_container">
              <Loader />
            </div>
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
