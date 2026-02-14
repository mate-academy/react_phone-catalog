/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';

import { MainContext } from '../../context/MainContext';
import { ProductsContext } from '../../context/ProductsContext';
import { Logo } from '../Logo';
import { Nav } from './components/Nav';
import { ToTop } from './components/ToTop';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  // #region context

  const { currentProduct } = useContext(ProductsContext);
  const { isOnHomePage, isMobile, scrollToTopHandler, isFooterAbsPos } =
    useContext(MainContext);

  // #endregion

  const getMTValue = useCallback(
    () => (isMobile ? '64px' : '80px'),
    [currentProduct, isMobile],
  );

  // #region styles

  const fStyles: React.CSSProperties = {
    marginTop: getMTValue(),
  };

  const fStylesOnEmptiness: React.CSSProperties = {
    margin: 0,
    position: 'absolute',
    inset: 'auto 0 0 0',
  };

  const getFooterStyles = useCallback(() => {
    if (isOnHomePage && isFooterAbsPos) {
      return fStyles;
    }

    if (isOnHomePage || currentProduct) {
      return {};
    }

    if (isFooterAbsPos) {
      return fStylesOnEmptiness;
    }

    return fStyles;
  }, [isOnHomePage, currentProduct, isFooterAbsPos]);

  // #endregion

  return (
    <footer className={styles.footer} style={getFooterStyles()}>
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
