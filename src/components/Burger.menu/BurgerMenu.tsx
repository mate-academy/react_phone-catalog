import React from 'react';
import style from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { menuLinks } from '../../constants/constants';
import { Logo } from '../Logo';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={classNames(style.menu, { [style['menu--open']]: isOpen })}
    >
      <div className={style.menu__header}>
        <Logo />

        <button className={style.close} onClick={onClose}>
          <img
            className="{style.burger__icon"
            src="img/icons/Close.svg"
            alt="Close Menu"
          />
        </button>
      </div>

      <ul className={style.menu__list}>
        {menuLinks.map(menuLink => (
          <li key={menuLink.name} className={style.menu__item}>
            <NavLink
              to={menuLink.path}
              className={style.menu__link}
              onClick={onClose}
            >
              {menuLink.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={style.menu__bottom}>
        <NavLink to="/favourites" className={style.iconFav} onClick={onClose}>
          <img src="img/icons/Favourites (Heart Like).svg" alt="Favourites" />
        </NavLink>
        <NavLink to="/cart" className={style.iconCart} onClick={onClose}>
          <img src="img/icons/Shopping bag (Cart).svg" alt="Cart" />
        </NavLink>
      </div>
    </aside>
  );
};
