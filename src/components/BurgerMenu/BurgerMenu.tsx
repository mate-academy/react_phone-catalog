import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MainNav } from '../MainNav';
import './BurgerMenu.scss';

type Props = {
  isOpened: boolean;
  closeMenu: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isOpened, closeMenu }) => {
  const buttonClass = (props: { isActive: boolean }) =>
    classNames('burger-menu__button', {
      'burger-menu__button--selected': props.isActive,
    });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLElement;

    if (element.tagName === 'A') {
      closeMenu();
    }
  };

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    window.scrollTo(0, 0);
  }, [isOpened]);

  useEffect(() => {
    const handleResize = () => {
      if (!isOpened) {
        return;
      }

      window.scroll({
        top: 0,
        behavior: 'instant',
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpened]);

  return (
    <div
      className={classNames('burger-menu', { 'burger-menu--opened': isOpened })}
      onClick={handleClick}
    >
      <div className="burger-menu__top">
        <img src="logo.svg" alt="Logo" className="burger-menu__logo" />

        <div className="burger-menu__close-button" onClick={closeMenu}>
          <img src="icons/close.svg" alt="Close icon" />
        </div>
      </div>

      <div className="burger-menu__bottom">
        <div className="burger-menu__container">
          <MainNav isVertical={true} />
        </div>

        <div className="burger-menu__buttons">
          <NavLink className={buttonClass} to="/favourites">
            <img src="icons/favourite.svg" alt="Favourite icon" />
          </NavLink>

          <NavLink className={buttonClass} to="/cart">
            <img src="icons/cart.svg" alt="Cart icon" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
