import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import { useContext } from 'react';
import { MenuOpen } from '../../utils/MenuContext';
import { useBasket, useFavorites } from '../../utils/Stores';

export const Menu = () => {
  const { setIsMenuOpen } = useContext(MenuOpen);

  const favorites = useFavorites(state => state.favorites);
  const basketStore = useBasket(state => state.basket);

  return (
    <aside id="menu" className="menu">
      <nav className="menu__nav">
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/phones"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Phones
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/tablets"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Tablets
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/accessories"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="menu__footer">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames('menu__footer-link', {
              'menu__footer-link--active': isActive,
            })
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="./img/heart-icon.svg" alt="favorites" />
          {favorites.length !== 0 && (
            <div className="products-counter">{favorites.length}</div>
          )}
        </NavLink>
        <NavLink
          to="/basket"
          className={({ isActive }) =>
            classNames('menu__footer-link', {
              'menu__footer-link--active': isActive,
            })
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="./img/basket-icon.svg" alt="basket" />
          {basketStore.length !== 0 && (
            <div className="products-counter">{basketStore.length}</div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
