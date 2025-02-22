/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Logo } from '../Logo';
import { Nav } from './components/Nav';
import { ToTop } from './components/ToTop';
import { MainContext } from '../../context/MainContext';
import classNames from 'classnames';
import { ProductsContext } from '../../context/ProductsContext';

export const Footer: React.FC = () => {
  // #region context

  const { currentProduct } = useContext(ProductsContext);
  const { isOnHomePage, isMobile, scrollToTopHandler } =
    useContext(MainContext);

  // #endregion

  const getMTValue = useCallback(
    () => (isMobile ? '64px' : '80px'),
    [currentProduct, isMobile],
  );

  const footerStyles: React.CSSProperties = {
    marginTop: getMTValue(),
  };

  const areModelsHigher = isOnHomePage || currentProduct;

  return (
    <footer
      className={styles.footer}
      style={areModelsHigher ? {} : footerStyles}
    >
      <div className={styles.container}>
        <Link
          className={classNames(styles['logo-wrapper'], {
            [styles['is-active']]: isOnHomePage,
          })}
          to={'/'}
          onClick={() => scrollToTopHandler(1000)}
        >
          <Logo />
        </Link>
        <Nav />
        <ToTop />
      </div>
    </footer>
  );
};
