import React, { useEffect, useRef } from 'react';
import styles from './menu.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../../../utils/Cartcontext/cartcontext';

export const Menu: React.FC = () => {
  const location = useLocation();

  const menuRef = useRef(null);
  const isOpen = location.pathname === '/menu';

  const { totalItem, totalFavo } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <aside
      ref={menuRef}
      className={classNames(styles.menu, { [styles['menu--open']]: isOpen })}
    >
      <div className={styles['top-bar']}>
        <NavLink to={'/'} className={styles['top-bar__link-logo']}>
          <img
            src="/img/logoblack.png"
            alt="logo nice gadgets"
            className={styles['top-bar__image-logo']}
          />
        </NavLink>
        <div className={styles['top-bar__actions-container']}>
          <NavLink to={'/'} className={styles['top-bar__action-menu']}>
            <img
              src="/img/Close.png"
              alt="icon close"
              className={styles['top-bar__image-menu']}
            />
          </NavLink>
        </div>
      </div>
      <div className={styles.menu__wrapper}>
        <div
          className={classNames(styles.menu__content, {
            [styles['menu__content--open']]: isOpen,
          })}
        >
          <ul className={styles['menu__nav-list']}>
            <li className={styles['menu__nav-item']}>
              <NavLink className={styles['menu__nav-link']} to={'/'}>
                home
              </NavLink>
            </li>
            <li className={styles['menu__nav-item']}>
              <NavLink className={styles['menu__nav-link']} to={'/phones'}>
                Phones
              </NavLink>
            </li>
            <li className={styles['menu__nav-item']}>
              <NavLink className={styles['menu__nav-link']} to={'/tablets'}>
                tablets
              </NavLink>
            </li>
            <li className={styles['menu__nav-item']}>
              <NavLink className={styles['menu__nav-link']} to={'/accessories'}>
                accessories
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles['bottom__bar-content']}>
          <div
            className={`${styles['bottom__bar-container']} ${styles['bottom__bar-container-heart']}`}
          >
            <NavLink className={styles['bottom__link-heart']} to={'/favorites'}>
              <img
                className={styles['bottom__bar-image']}
                src="/img/heart.png"
                alt=""
              />
              <span className={styles['bottom__bar-counter-heart']}>
                {totalFavo}
              </span>
            </NavLink>
          </div>
          <div
            className={`${styles['bottom__bar-container']} ${styles['bottom__bar-container-bag']}`}
          >
            <NavLink className={styles['bottom__link-bag']} to={'/bag'}>
              <img
                className={styles['bottom__bar-image']}
                src="/img/cart.png"
                alt=""
              />
              <span className={styles['bottom__bar-counter-bag']}>
                {totalItem}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};
