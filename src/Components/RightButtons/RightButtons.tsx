import React from 'react';
import s from './RightButtons.module.scss';
import classNames from 'classnames';

type Props = {
  burgerMenu?: boolean;
};

export const RightButtons: React.FC<Props> = ({ burgerMenu = false }) => {
  const onMobile = { [s.onMobile]: burgerMenu };

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
        <a href="">
          <img src="./img/icons/burgerMenu.png" alt="menu" />
        </a>
      </div>
    </div>
  );
};
