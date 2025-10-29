import React, { useContext } from 'react';
// import { Navigation } from './components/Navigation/Navigation';
import styles from './TopBar.module.scss';
import { Link } from 'react-router-dom';
import { HeaderContext } from '../Header/context/HeaderContext';
import classNames from 'classnames';

export const TopBar = () => {
  const { showNavigation, setShowNavigation } = useContext(HeaderContext);

  return (
    <div className={styles['top-bar']}>
      <div className={styles['top-bar__wrapper']}>
        <div className={styles['top-bar__left-block']}>
          <Link to="/" className={styles['top-bar__logo']}>
            <img src="/src/assets/img/Logo.svg" alt="logo" />
          </Link>
        </div>

        <div className={styles['top-bar__right-block']}>
          <button
            className={classNames(
              'icon',
              { 'icon--menu': !showNavigation },
              { 'icon--close': showNavigation },
            )}
            onClick={() => setShowNavigation(prev => !prev)}
          ></button>
        </div>
      </div>
    </div>
  );
};
