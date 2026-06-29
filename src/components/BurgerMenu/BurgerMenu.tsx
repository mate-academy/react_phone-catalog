import React, { Dispatch, SetStateAction, useContext } from 'react';
import BM from './BurgerMenu.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { FavouritesContext } from '../../contexts/FavouritesContext';
import { CartContext } from '../../contexts/CartContext';

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const BurgerMenu: React.FC<Props> = ({ setIsMenuOpen }) => {
  const { fav } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  return (
    <aside className={BM.BM}>
      <div className="container">
        <div className={BM.BM__content}>
          <nav className={BM.BM__nav}>
            <ul className={BM.nav__list}>
              <li className={BM.nav__item}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn(BM.nav__link, {
                      [BM.nav__link__active]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li className={BM.nav__item}>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    cn(BM.nav__link, {
                      [BM.nav__link__active]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Phones
                </NavLink>
              </li>
              <li className={BM.nav__item}>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    cn(BM.nav__link, {
                      [BM.nav__link__active]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={BM.nav__item}>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    cn(BM.nav__link, {
                      [BM.nav__link__active]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={BM.actions}>
        <ul className={BM.actions__list}>
          <li className={BM.actions__item}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                cn(BM.actions__link, BM.actions__link__fav, {
                  [BM.actions__link__active]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {fav.length > 0 && (
                <div className={BM.counter__container}>
                  <p className={BM.counter__value}>{fav.length}</p>
                </div>
              )}
            </NavLink>
          </li>
          <li className={BM.actions__item}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(BM.actions__link, BM.actions__link__cart, {
                  [BM.actions__link__active]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {cart.length > 0 && (
                <div className={BM.counter__container}>
                  <p className={BM.counter__value}>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
