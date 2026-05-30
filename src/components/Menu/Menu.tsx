import { Logo } from '../Logo';
import { NavigationMobile } from '../NavigationMobile';
import styles from './Menu.module.scss';
import { Icon } from '../Icon';
import { useAppSelector } from '../../store/hooks';
import { useMenu } from '../../hooks/useMenu';
import { useEffect } from 'react';
import { NavButtonItem } from '../NavButtonItem';

export const Menu = () => {
  const { favourites } = useAppSelector(state => state.favourites);
  const { cart } = useAppSelector(state => state.cart);
  const favsCounter = favourites.length;
  const cartCounter = cart.reduce((acc, item) => item.quantity + acc, 0);
  const { isOpen, closeMenu } = useMenu();

  const handleCloseMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target && target.closest('a')) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [closeMenu, isOpen]);

  return (
    <aside className={styles.menu} onClick={handleCloseMenu}>
      <div className={styles.menu__top}>
        <div className={styles.menu__logo}>
          <Logo />
        </div>
        <button className={styles['menu__close-btn']} onClick={closeMenu}>
          <Icon type="close" />
        </button>
      </div>

      <div className={styles.menu__nav}>
        <NavigationMobile />
      </div>

      <div className={styles.menu__links}>
        <div className={styles.menu__link}>
          <NavButtonItem
            path="/favourites"
            type="heart"
            counter={favsCounter}
          />
        </div>

        <div className={styles.menu__link}>
          <NavButtonItem path="/cart" type="cart" counter={cartCounter} />
        </div>
      </div>
    </aside>
  );
};
