import React, { useEffect } from 'react';
import style from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

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
    <div className={style.burgerMenu}>
      <nav className={style.burgerMenuNav}>
        {['/', '/phones', '/tablets', '/accessories'].map((path, i) => {
          const label = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'][i];

          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                classNames(style.burgerMenuLink, {
                  [style.burgerMenuLinkActive]: isActive,
                })
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className={style.burgerMenuButton}>
        {['/favourites', '/cart'].map((path, i) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              classNames(style.burgerMenuButtonLink, {
                [style.burgerMenuButtonActive]: isActive,
              })
            }
            onClick={() => setOpen(false)}
          >
            <img
              src={
                i === 0
                  ? 'img/icons/Favourites (Heart Like).svg'
                  : 'img/icons/Shopping bag (Cart).svg'
              }
              alt={i === 0 ? 'favourites' : 'cart'}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
