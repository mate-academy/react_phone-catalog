/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createRef, useState } from 'react';
import classNames from 'classnames';
import './Header.scss';
import '../../scss/blocks/nav.scss';
import { Link, useLocation } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink';
import logo from '../../img/LOGO.svg';

export const Header = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState<string>('');
  const location = useLocation();
  const currentPath = location.pathname;

  const handleClick = () => {
    if (!inputValue) {
      inputRef.current?.focus();

      return;
    }

    setInputValue('');
  };

  return (
    <header className="header" id="header">
      <div className="logo header__logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav__pages">
          <li className="nav__page">
            <PageNavLink to="//" text="Home" />
          </li>
          <li className="nav__page">
            <PageNavLink to="phones" text="Phones" />
          </li>
          <li className="nav__page">
            <PageNavLink to="tablets" text="Tablets" />
          </li>
          <li className="nav__page">
            <PageNavLink to="accessories" text="Accessories" />
          </li>
        </ul>
      </nav>
      {currentPath === '/phones' && (
        <div className="header__search">
          <input
            ref={inputRef}
            type="text"
            className="header__input"
            placeholder="Search in phones..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <i
            className={classNames(
              'icon',
              'header__icon',
              { 'header__icon--search': !inputValue },
              { 'header__icon--delete': inputValue },
            )}
            onClick={handleClick}
          />
        </div>
      )}
      <div className="header__buttons">
        <PageNavLink to="favorites" text="" button icon="heart" />
        <PageNavLink to="cart" text="" button icon="cart" />
      </div>
    </header>
  );
};
