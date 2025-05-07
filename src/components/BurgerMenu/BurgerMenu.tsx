import classNames from 'classnames';
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  burgerMenu: boolean;
  setBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BurgerMenu: React.FC<Props> = ({ burgerMenu, setBurgerMenu }) => {
  const location = useLocation();

  useEffect(() => {
    if (burgerMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Очистка эффекта
    return () => {
      document.body.style.overflow = 'auto'; // Восстанавливаем скролл при демонтировании
    };
  }, [burgerMenu]);

  return (
    <div className={`burger-menu ${burgerMenu ? 'burger-menu--active' : ''}`}>
      <div className="burger-menu__inner">
        <div className="burger-menu--text">
          <NavLink
            className={({ isActive }) =>
              classNames('burger-menu--text-button', {
                'burger-menu--text-button--is-active': isActive,
              })
            }
            onClick={() => setBurgerMenu(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('burger-menu--text-button', {
                'burger-menu--text-button--is-active': isActive,
              })
            }
            onClick={() => setBurgerMenu(false)}
            to="/phones"
          >
            PHONES
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('burger-menu--text-button', {
                'burger-menu--text-button--is-active': isActive,
              })
            }
            onClick={() => setBurgerMenu(false)}
            to="/tablets"
          >
            TABLETS
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('burger-menu--text-button', {
                'burger-menu--text-button--is-active': isActive,
              })
            }
            onClick={() => setBurgerMenu(false)}
            to="/accessories"
          >
            ACCESSORIES
          </NavLink>
        </div>

        <div className="burger-menu--button">
          <NavLink
            className={({ isActive }) =>
              classNames('b-s-d ertyu', {
                'b-s-d--is-active': isActive,
              })
            }
            onClick={() => setBurgerMenu(false)}
            to="/favourites"
          >
            <img src="./img/Favourites (1).svg" alt="Favourites" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('b-s-d', {
                'b-s-d--is-active': isActive,
              })
            }
            state={{ from: location.pathname }}
            onClick={() => setBurgerMenu(false)}
            to="/cart"
          >
            <img src="./img/Cart (1).svg" alt="Cart" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
