import React from 'react';
import styles from './TopBar.module.scss';
import classNames from 'classnames';
import { Navigation } from '../Navigation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleMenu } from '../../features/settingsSlice';
import TopBarActions from '../TopBarActions/TopBarActions';
import logo from '../../assets/img/tools/Logo.svg';
import { useMediaQuery } from 'react-responsive';

const TopBar = () => {
  const isMenu = useAppSelector(state => state.menu.isOpenMenu);
  const isTablet = useMediaQuery({ minWidth: 640 });
  const dispatch = useAppDispatch();

  return (
    <div className={styles['top-bar']}>
      <a href="#" className={styles['top-bar__logo']}>
        <img src={logo} alt="logo" />
      </a>

      {isTablet && <Navigation />}

      <div className={styles['top-bar__controls']}>
        <a
          className={classNames(
            styles['top-bar__btn'],
            styles['top-bar__menu-btn'],
            {
              [styles['top-bar__menu-btn--close']]: isMenu,
            },
          )}
          onClick={() => dispatch(toggleMenu())}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
        <TopBarActions
          favouriteBtnClass={classNames(
            styles['top-bar__btn'],
            styles['top-bar__favourite-btn'],
          )}
          cardBtnClass={classNames(
            styles['top-bar__btn'],
            styles['top-bar__card-btn'],
          )}
        />
      </div>
    </div>
  );
};

export default TopBar;
