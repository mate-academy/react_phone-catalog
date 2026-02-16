import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BurgerMenu.module.scss';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const BurgerMenu: React.FC<Props> = ({ open, setOpen }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className={styles.burgerMenu}>
      <nav className={styles.burgerMenuNav}>
        {['/', '/phones', '/tablets', '/accessories'].map((path, i) => {
          const label = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'][i];

          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                classNames(styles.burgerMenuLink, {
                  [styles.burgerMenuLinkActive]: isActive,
                })
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.burgerMenuButton}>
        {['/favourites', '/cart'].map((path, i) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              classNames(styles.burgerMenuButtonLink, {
                [styles.burgerMenuButtonActive]: isActive,
              })
            }
            onClick={() => setOpen(false)}
          >
            <img
              src={
                i === 0
                  ? 'img/icons/icon-favourites.svg'
                  : 'img/icons/icon-cart.svg'
              }
              alt={i === 0 ? 'favourites' : 'cart'}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
