import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import favorite from '../images/favorite.svg';
import cart from '../images/cart.svg';
import logo from '../images/Logo.svg';

export const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__logo">
          <img src={logo} alt="logo" className="header__logo--img" />
        </a>

        <nav className="header__nav">
          <Link
            to="/"
            onClick={handleClick}
            className={classNames('header__nav--link', {
              'is-active': isActive,
            })}
          >
            HOME
          </Link>
          <Link
            to="/phones"
            onClick={handleClick}
            className={classNames('header__nav--link', {
              'is-active': isActive,
            })}
          >
            PHONES
          </Link>
          <Link
            to="/tablets"
            onClick={handleClick}
            className={classNames('header__nav--link', {
              'is-active': isActive,
            })}
          >
            TABLETS
          </Link>
          <Link
            to="/accessories"
            onClick={handleClick}
            className={classNames('header__nav--link', {
              'is-active': isActive,
            })}
          >
            ACCESSORIES
          </Link>
        </nav>
      </div>

      <div className="header__right">
        <a href="/favotites">
          <img src={favorite} alt="favorite" className="header__right--img" />
        </a>
        <a href="/cart">
          <img src={cart} alt="favorite" className="header__right--img" />
        </a>
      </div>
    </header>
  );
};
