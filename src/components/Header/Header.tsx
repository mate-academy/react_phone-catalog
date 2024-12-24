import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';

export const Header = () => {
  const navLinkClass = (props: { isActive: boolean }) =>
    classNames('header__nav-item text-button', {
      'header__nav-item--selected': props.isActive,
    });

  const buttonClass = (props: { isActive: boolean }) =>
    classNames('header__button', {
      'header__button--selected': props.isActive,
    });

  return (
    <header className="header">
      <div className="header__left">
        <img src="/logo.svg" alt="Logo" className="header__logo" />

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            <li>
              <NavLink className={navLinkClass} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/phones">
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/tablets">
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/accessories">
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__buttons">
        <NavLink className={buttonClass} to="/favourites">
          <img src="/icons/favourite.svg" alt="Favourite icon" />
        </NavLink>

        <NavLink className={buttonClass} to="/cart">
          <img src="/icons/cart.svg" alt="Cart icon" />
        </NavLink>
      </div>

      <div className="header__buttons header__buttons-mobile">
        <button className="header__button">
          <img src="/icons/menu.svg" alt="Burger menu icon" />
        </button>
      </div>
    </header>
  );
};
