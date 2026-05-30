import './Menu.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  favorites: number;
  totalCount: number;
}

export const Menu: React.FC<Props> = ({ favorites, totalCount }) => {
  return (
    <div className="content-phone__menu">
      <div className="text-phone-menu">
        <NavLink
          className={({ isActive }) =>
            classNames('navigation__link link-in-phone', {
              'is-active__phone': isActive,
            })
          }
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('navigation__link link-in-phone', {
              'is-active__phone': isActive,
            })
          }
          to="/phones"
        >
          PHONES
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('navigation__link link-in-phone', {
              'is-active__phone': isActive,
            })
          }
          to="/tablets"
        >
          TABLETS
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('navigation__link link-in-phone', {
              'is-active__phone': isActive,
            })
          }
          to="/accessories"
        >
          ACCESSORIES
        </NavLink>
      </div>
      <div className="icon-navigation">
        <NavLink
          className={({ isActive }) =>
            classNames('icon-container phone__icon-container', {
              'is-active': isActive,
            })
          }
          to="/favorites"
        >
          {favorites > 0 && (
            <span className="nav__count count-in-phone">{favorites}</span>
          )}
          <img
            className="icon-heart"
            src="/imgForProject/icon/Favourites.png"
            alt="Favorites"
          />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('icon-container phone__icon-container', {
              'is-active': isActive,
            })
          }
          to="/cart"
        >
          {totalCount > 0 && (
            <span className="nav__count count-in-phone">{totalCount}</span>
          )}
          <img
            className="icon-bag"
            src="/imgForProject/icon/Shopping_bag.png"
            alt="Shopping bag"
          />
        </NavLink>
      </div>
    </div>
  );
};
