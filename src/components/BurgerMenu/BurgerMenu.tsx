import React from 'react';
import classNames from 'classnames';
import './BurgerMenu.scss';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <div className="burger-menu" onClick={onClick}>
      <div
        className={classNames('burger-menu__line', 'burger-menu__line--1', {
          'burger-menu--open': isOpen,
        })}
      ></div>
      <div
        className={classNames('burger-menu__line', 'burger-menu__line--2', {
          'burger-menu--open': isOpen,
        })}
      ></div>
      <div
        className={classNames('burger-menu__line', 'burger-menu__line--3', {
          'burger-menu--open': isOpen,
        })}
      ></div>
    </div>
  );
};
