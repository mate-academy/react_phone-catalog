import React from 'react'

import { NavLink } from "react-router-dom";
import { Navigation } from '../Navigation';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import * as uiAction from '../../../../app/store/slices/uiSlice';

import burgerMenu from '../../../../assets/icons/burger-menu.svg';
import closeIcon from '../../../../assets/icons/close-menu.svg';

import styles from './Header.module.scss';


export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.ui.isOpenNav);

  const handleOpenMobileNav = () => {
    dispatch(uiAction.openModal(!isOpen));
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerTop}>
          <NavLink to="/" className={styles.headerLogo}>
            <img src="src/assets/img/logo.svg" alt="Nice Gadgets Logo" />
          </NavLink>
          <div className={styles.headerBurger} onClick={handleOpenMobileNav}>
            <img src={isOpen ? closeIcon : burgerMenu} alt={isOpen ? 'Close Menu' : 'Burger Button'} />
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
};
