import React, { useContext } from 'react';
import s from './RightButtons.module.scss';
import classNames from 'classnames';
import { BurgerContext } from '../../../context/BurgerContext';

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
      <div className={classNames(s.right__buttons_favorite, onMobile)}>
        <a href="">
          <img src="./img/icons/favourites.png" alt="favourite" />
        </a>
      </div>
      <div className={classNames(s.right__buttons_cart, onMobile)}>
        <a href="">
          <img src="./img/icons/shoppingBag.png" alt="shopping bag" />
        </a>
      </div>
      <div className={classNames(s.right__buttons_burgerMenu, onMobile)}>
        <button
          className={s.right__buttons_burgerMenu_style}
          onClick={tougleBurgerMenu}
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
