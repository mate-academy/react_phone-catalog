/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';

export const Header = () => {
  const isLinkActive = (isActive: boolean) => {
    return cn('header__nav-link', {
      active: isActive,
    });
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link
          to="home"
          className="header__logo"
        >
          <img
            src="icons/logo.svg"
            alt="logo"
            className="header__logo-img"
          />
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="home"
                className={isActive => isLinkActive(isActive.isActive)}
              >
                Home
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="phones"
                className={isActive => isLinkActive(isActive.isActive)}
              >
                Phones
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="tablets"
                className={isActive => isLinkActive(isActive.isActive)}
              >
                Tablets
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="accessories"
                className={isActive => isLinkActive(isActive.isActive)}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__right">
        <div className="header__search">
          <input
            type="text"
            className="header__search-input"
            placeholder="Search in phones..."
          />
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="header__search-button">
            <img
              src="icons/search.svg"
              alt="search"
              className="header__search-icon"
            />
          </button>
        </div>
        <div className="header__user-choice">
          <Link
            to="#"
            className="header__user-choice-link"
          >
            <img
              src="icons/heart.svg"
              alt="cart"
              className="header__user-choice-icon"
            />
            <span className="header__user-choice-count">2</span>
          </Link>
        </div>
        <div className="header__user-choice">
          <Link
            to="#"
            className="header__user-choice-link"
          >
            <img
              src="icons/bag.svg"
              alt="cart"
              className="header__user-choice-icon"
            />
            <span className="header__user-choice-count">2</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
