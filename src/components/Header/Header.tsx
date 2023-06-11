import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';

const nav = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Phones',
    to: '/phones',
  },
  {
    name: 'Tablets',
    to: '/tablets',
  },
  {
    name: 'Accessories',
    to: '/accessories',
  },
];

export const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <header className="header__wrapper">
      <Link to="/" className="header__logo logo">
        <img src="../../public/_new/img/icons/LOGO.svg" alt="Logo" />
      </Link>

      <div className="header__content">
        <ul className="header__nav-list">
          {nav.map(({ name, to }) => (
            <li
              className={
                classNames('header__nav-item', { underlined: pathname === to })
              }
              key={name}
            >
              <Link
                to={to}
                className="header__nav-link"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="header__right-bar">
          {/* here should be placed search bar in the future */}
          <Link
            to="/favorites"
            className={
              classNames('header__favorites',
                { underlined: pathname === '/favorites' })
            }
          >
            <img
              src="../../public/_new/img/icons/favorites-icon.svg"
              alt="Favorites products"
            />
          </Link>
          <Link
            to="/shopping-bag"
            className={
              classNames('header__shopping-bag',
                { underlined: pathname === '/shopping-bag' })
            }
          >
            <img
              src="../../public/_new/img/icons/shopping-bag-icon.svg"
              alt="Shopping bag"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
