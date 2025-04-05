import React, { useContext } from 'react';
import s from './RightButtons.module.scss';
import classNames from 'classnames';
import { BurgerContext } from '../../../context/BurgerContext';
import { NavLink } from 'react-router-dom';

type Props = {
  burgerMenu?: boolean;
};

export const RightButtons: React.FC<Props> = ({ burgerMenu = false }) => {
  const onMobile = { [s.onMobile]: burgerMenu };
  const { burgerMenuActivate, setBurgerMenuActivate } =
    useContext(BurgerContext);

  const tougleBurgerMenu = () => {
    return burgerMenuActivate === false
      ? setBurgerMenuActivate(true)
      : setBurgerMenuActivate(false);
  };

  return (
    <div className={classNames(s.right__buttons, onMobile)}>
      <NavLink
        to="favourites"
        className={({ isActive }) =>
          classNames(s.right__buttons_favorite, {
            [s.onMobile]: burgerMenu,
            [s.is_active]: isActive,
          })
        }
      >
        <img src="./img/icons/favourites.png" alt="favourite" />
      </NavLink>
      <div className={classNames(s.right__buttons_cart, onMobile)}>
        <a href="">
          <img src="./img/icons/shoppingBag.png" alt="shopping bag" />
        </a>
      </div>
      <div className={classNames(s.right__buttons_burgerMenu, onMobile)}>
        <NavLink
          to={'shopping-bag'}
          className={s.right__buttons_burgerMenu_style}
          onClick={tougleBurgerMenu}
        >
          {!burgerMenuActivate ? (
            <img src="./img/icons/burgerMenu.png" alt="menu" />
          ) : (
            <img src="./img/icons/close.png" alt="close" />
          )}
        </NavLink>
      </div>
    </div>
  );
};
