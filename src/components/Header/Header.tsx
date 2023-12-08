import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './Header.scss';

export const Header = () => {
  const getLinkClass = ({ isActive }:{ isActive: boolean }) => classNames(
    'header__link', {
      'header__link-active': isActive,
    },
  );

  const favouritesPhones
  = useAppSelector(state => state.favourites.favouritesPhones);
  const cardPhones = useAppSelector(state => state.card.cardPhones);
  const location = useLocation();

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo" />
        <div className="header__main">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </div>
      </nav>
      <div className="header__container">
        <div className="header__right">
          <NavLink
            to="/favourites"
            className={({ isActive }) => classNames(
              'header__favourites',
              {
                'header__favourites--active': isActive,
              },
            )}
          />
          {favouritesPhones.length !== 0 && (
            <div className="favourites__count">
              <span className="favourites__count-text">
                {favouritesPhones.length}
              </span>
            </div>
          )}
          <NavLink
            to="/cart"
            className={({ isActive }) => classNames(
              'header__bag',
              {
                'header__bag--active': isActive,
              },
            )}
          />
          {cardPhones.length !== 0 && (
            <div className="card__count">
              <span className="card__count-text">{cardPhones.length}</span>
            </div>
          )}
        </div>
        {location.pathname === '/menu'
          ? (
            <Link
              to=".."
              className="icon icon__close"
            />
          )
          : (
            <Link
              to="/menu"
              className="icon icon__menu"
            />
          )}
      </div>
    </header>
  );
};
