import React from 'react';
import styles from './header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../../../utils/Cartcontext/cartcontext';

export const Header: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__link, {
      [styles['nav__link--active']]: isActive,
    });

  const { totalItem, totalFavo } = useCart();
  const location = useLocation();
  const isBag = location.pathname === '/bag';
  const isFavo = location.pathname === '/favorites';

  return (
    <header className={styles.header}>
      <div className={styles['top-bar']}>
        <NavLink to={'/'} className={styles['top-bar__link-logo']}>
          <img
            src="/img/Logo.png"
            alt="logo nice gadgets"
            className={styles['top-bar__image-logo']}
          />
        </NavLink>
        <div className={styles.nav}>
          <nav>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <NavLink className={getLinkClass} to={'/'}>
                  home
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink className={getLinkClass} to={'/phones'}>
                  Phones
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink className={getLinkClass} to={'/tablets'}>
                  tablets
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink className={getLinkClass} to={'/accessories'}>
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles['top-bar__actions-container']}>
          <div
            className={classNames(styles['top-bar__actions-content-heart'], {
              [styles['top-bar__actions-content-heart--active']]: isFavo,
            })}
          >
            <NavLink
              to={'/favorites'}
              className={styles['top-bar__action-heart']}
            >
              <img
                src="/img/heart.png"
                alt="heart"
                className={styles['top-bar__image-heart']}
              />
              {totalFavo > 0 && (
                <span className={styles['top-bar__heart-counter']}>
                  {totalFavo}
                </span>
              )}
            </NavLink>
          </div>
          <div
            className={classNames(styles['top-bar__actions-content-bag'], {
              [styles['top-bar__actions-content-bag--active']]: isBag,
            })}
          >
            <NavLink to={'/bag'} className={styles['top-bar__action-bag']}>
              <img
                src="/img/cart.png"
                alt="bag"
                className={styles['top-bar__image-bag']}
              />
              {totalItem > 0 && (
                <span className={styles['top-bar__bag-counter']}>
                  {totalItem}
                </span>
              )}
            </NavLink>
          </div>
          <div className={styles['top-bar__actions-content-menu']}>
            <NavLink to={'/menu'} className={styles['top-bar__action-menu']}>
              <img
                src="/img/Menu.png"
                alt="icon burger"
                className={styles['top-bar__image-menu']}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
