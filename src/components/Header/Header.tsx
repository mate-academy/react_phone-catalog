import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';

import './Header.scss';
import { MyLogo } from '../UI/MyLogo';

export const Header = () => {
  return (
    <header className="header" id="top">
      <div className="header__left">
        <MyLogo />
        <Navbar />
      </div>

      <div className="header__right">
        <Link to="/favorite" className="header__link">
          <img src="/img/icons/heart.svg" alt="favorite" />
        </Link>
        <Link to="/cart" className="header__link">
          <img src="/img/icons/cart.svg" alt="cart" />
        </Link>
      </div>
    </header>
  );
};
