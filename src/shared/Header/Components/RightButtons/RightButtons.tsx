import React, { useContext, useEffect } from 'react';
import s from './RightButtons.module.scss';
import classNames from 'classnames';
import { BurgerContext } from '../../../context/BurgerContext';
import { NavLink } from 'react-router-dom';
import { RightButtonContext } from '../../../context/RightButtonContext';

type Props = {
  burgerMenu?: boolean;
};

export const RightButtons: React.FC<Props> = ({ burgerMenu = false }) => {
  const { favouritesLength, shoppingBagLength } =
    useContext(RightButtonContext);

  const onMobile = { [s.onMobile]: burgerMenu };
  const { burgerMenuActivate, setBurgerMenuActivate } =
    useContext(BurgerContext);

  const toggleBurgerMenu = () =>
    setBurgerMenuActivate((prev: boolean) => !prev);

  useEffect(() => {
    if (burgerMenuActivate) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [burgerMenuActivate]);

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
        {favouritesLength > 0 && <span>{favouritesLength}</span>}
      </NavLink>
      <NavLink
        to={'shopping-bag'}
        className={classNames(s.right__buttons_cart, onMobile)}
        onClick={burgerMenu ? toggleBurgerMenu : undefined}
      >
        <img src="./img/icons/shoppingBag.png" alt="shopping bag" />
        {shoppingBagLength > 0 && <span>{shoppingBagLength}</span>}
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
