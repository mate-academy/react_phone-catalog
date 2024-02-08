// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <img src="img/logo.png" alt="logo" />
        </Link>

        <Navbar />
      </div>

      <div className="header__right">
        <Link to="/favorite">
          <img src="/img/icons/heart.svg" alt="favorite" />
        </Link>

        <Link to="/cart">
          <img src="/img/icons/cart.svg" alt="cart" />
        </Link>
      </div>
    </header>
  );
};
