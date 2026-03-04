import { NavLink } from 'react-router-dom';
import menu from './Menu.module.scss';
import cn from 'classnames';
import React, { useContext } from 'react';
import { AddToCartContext } from '../../contexts/AddToCartContext';
import { AddToFavContext } from '../../contexts/AddToFavContext';

type Props = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Menu: React.FC<Props> = ({ setIsMenuOpen }) => {
  const { cart } = useContext(AddToCartContext);
  const { fav } = useContext(AddToFavContext);

  return (
    <aside className={menu.menu}>
      <div className="container">
        <div className={menu.menu__content}>
          <nav className={cn(menu.menu__nav, menu.nav)}>
            <ul className={menu.nav__list}>
              <li className={menu.nav__item}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  home
                </NavLink>
              </li>
              <li className={menu.nav__item}>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  phones
                </NavLink>
              </li>
              <li className={menu.nav__item}>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  tablets
                </NavLink>
              </li>
              <li className={menu.nav__item}>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={cn(menu.menu__actions, menu.actions)}>
        <ul className={menu.actions__list}>
          <li className={menu.actions__item}>
            <NavLink
              to="favourites"
              className={({ isActive }) =>
                cn(menu.actions__link, menu.actions__link__fav, {
                  [menu['link--active']]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {fav.length > 0 && (
                <div className={menu.counter__container}>
                  <p className={menu.counter}>{fav.length}</p>
                </div>
              )}
            </NavLink>
          </li>
          <li className={menu.actions__item}>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                cn(menu.actions__link, menu.actions__link__cart, {
                  [menu['link--active']]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {cart.length > 0 && (
                <div className={menu.counter__container}>
                  <p className={menu.counter}>
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
