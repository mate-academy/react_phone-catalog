import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './BurgerMenu.scss';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const BurgerMenu: React.FC<Props> = ({ open, setOpen }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="burger-menu">
      <nav className="burger-menu__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `burger-menu__link ${isActive ? 'burger-menu__link--active' : ''}`
          }
          onClick={() => setOpen(false)}
        >
          HOME
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `burger-menu__link ${isActive ? 'burger-menu__link--active' : ''}`
          }
          onClick={() => setOpen(false)}
        >
          PHONES
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `burger-menu__link ${isActive ? 'burger-menu__link--active' : ''}`
          }
          onClick={() => setOpen(false)}
        >
          TABLETS
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `burger-menu__link ${isActive ? 'burger-menu__link--active' : ''}`
          }
          onClick={() => setOpen(false)}
        >
          ACCESSORIES
        </NavLink>
      </nav>
      <div className="burger-menu__button">
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            `burger-menu__button-link ${isActive ? 'burger-menu__button--active' : ''}`
          }
          onClick={() => setOpen(false)}
        >
          <img src="/img/icons/icon-favourites.svg" alt="favourites" />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `burger-menu__button-link ${isActive ? 'burger-menu__button--active' : ''}`
          }
          onClick={() => setOpen(false)}
        >
          <img src="/img/icons/icon-cart.svg" alt="cart" />
        </NavLink>
      </div>
    </div>
  );
};
