import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Counter } from '../Counter';
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
  const favoriteCounter = useAppSelector(state => state.favoriteCounter.value);
  const shoppingCounter = useAppSelector(state => state.shoppingCounter.value);

  return (
    <header className="header__wrapper">
      <Link to="/" className="header__logo logo">
        <img src="/_new/img/icons/LOGO.svg" alt="Logo" />
      </Link>

      <div className="header__content">
        <ul className="header__nav-list">
          {nav.map(({ name, to }) => (
            <li
              className={
                classNames('header__nav-item', { focused: pathname === to })
              }
              key={name}
            >
              <Link
                to={to}
                className={classNames('header__nav-link', { 'header__nav-link--highlighted': pathname === to })}
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
                { focused: pathname === '/favorites' })
            }
          >
            <img
              src="/_new/img/icons/favorites-icon.svg"
              alt="Favorites products"
            />

            <Counter count={favoriteCounter} />
          </Link>
          <Link
            to="/shopping-bag"
            className={
              classNames('header__shopping-bag',
                { focused: pathname === '/shopping-bag' })
            }
          >
            <img
              src="/_new/img/icons/shopping-bag-icon.svg"
              alt="Shopping bag"
            />

            <Counter count={shoppingCounter} />
          </Link>
        </div>
      </div>
    </header>
  );
};
