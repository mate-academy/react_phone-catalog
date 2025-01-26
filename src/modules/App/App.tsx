import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './App.module.scss';

import { getProducts } from '@services/products';

import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { MenuContext } from '@store/MenuStore';
import { ProductsContext, DispatchProductsContext } from '@store/ProductsStore';

export const App = () => {
  const products = useContext(ProductsContext);
  const dispatchProducts = useContext(DispatchProductsContext);

  // fetching data
  useEffect(() => {
    if (
      products.phones.length &&
      products.tablets.length &&
      products.accessories.length
    ) {
      return;
    }

    getProducts().then(loadedProducts =>
      dispatchProducts({ type: 'set', payload: loadedProducts }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { pathname } = useLocation();
  const isMenuOpen = useContext(MenuContext);

  // disable scrolling while menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  }, [isMenuOpen]);

  return (
    <div className={classNames(styles.app)}>
      <div className={styles.app__header}>
        <Header />
      </div>

      <Menu />

      <div
        className={classNames(styles.app__body, {
          [styles['app__body--home']]: pathname === '/',
        })}
      >
        <div className={styles.app__content}>
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};
