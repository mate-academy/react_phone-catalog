import { useMenu } from '../../hooks/useMenu';
import React, { useEffect } from 'react';
import { Logo } from '../Logo';
import slyles from './BurgerMenu.module.scss';
import { NavigationMenu } from '../NavigationMenu';
import { NavIcon } from '../NavIcon';
import classNames from 'classnames';

export const BurgerMenu = () => {
  const { isOpen, closeMenu } = useMenu();
  const handleCloseMenu = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && target.closest('[data-nav-link]')) {
      closeMenu();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && window.innerWidth > 640) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, closeMenu]);

  return (
    isOpen && (
      <div className={classNames('app__menu', { 'app__menu--open': isOpen })}>
        <aside onClick={handleCloseMenu} className={slyles.menu}>
          <div className={slyles.menu__top}>
            <div data-nav-link className={slyles.menu__logo}>
              <Logo />
            </div>
          </div>

          <div data-nav-link className={slyles.menu_nav}>
            <NavigationMenu isMenu />
          </div>

          <div data-nav-link className={slyles.menu__icons}>
            <div className={slyles.menu__icon}>
              <NavIcon type="favourite" path="/favourites" />
            </div>

            <div className={slyles.menu__icon}>
              <NavIcon type="cart" path="/cart" />
            </div>
          </div>
        </aside>
      </div>
    )
  );
};