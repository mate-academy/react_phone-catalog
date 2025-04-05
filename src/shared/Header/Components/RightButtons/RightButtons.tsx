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

  const toggleBurgerMenu = () =>
    setBurgerMenuActivate((prev: boolean) => !prev);

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
        onClick={burgerMenu ? toggleBurgerMenu : undefined}
      >
        <img src="./img/icons/favourites.png" alt="favourite" />
      </NavLink>
      <NavLink
        to={'shopping-bag'}
        className={classNames(s.right__buttons_cart, onMobile)}
        onClick={burgerMenu ? toggleBurgerMenu : undefined}
      >
        <img src="./img/icons/shoppingBag.png" alt="shopping bag" />
      </NavLink>
      <div className={classNames(s.right__buttons_burgerMenu, onMobile)}>
        <button
          className={s.right__buttons_burgerMenu_style}
          onClick={toggleBurgerMenu}
        >
          {!burgerMenuActivate ? (
            <img src="./img/icons/burgerMenu.png" alt="menu" />
          ) : (
            <img src="./img/icons/close.png" alt="close" />
          )}
        </button>
      </div>
    </div>
  );
};
