import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
          <Link
            className="burger-menu--text-button"
            onClick={() => setBurgerMenu(false)}
            to="/"
          >
            HOME
          </Link>
          <Link
            className="burger-menu--text-button"
            onClick={() => setBurgerMenu(false)}
            to="/phones"
          >
            PHONES
          </Link>
          <Link
            className="burger-menu--text-button"
            onClick={() => setBurgerMenu(false)}
            to="/tablets"
          >
            TABLETS
          </Link>
          <Link
            className="burger-menu--text-button"
            onClick={() => setBurgerMenu(false)}
            to="/accessories"
          >
            ACCESSORIES
          </Link>
        </div>

        <div className="burger-menu--button">
          <Link onClick={() => setBurgerMenu(false)} to="/favourites">
            <img src="./img/Favourites.svg" alt="Favourites" />
          </Link>
          <Link
            state={{ from: location.pathname }}
            onClick={() => setBurgerMenu(false)}
            to="/cart"
          >
            <img src="./img/Cart.svg" alt="Cart" />
          </Link>
        </div>
      </div>
    </div>
  );
};
