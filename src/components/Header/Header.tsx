import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import './header.scss';
import { BurgerMenu } from '../BurgerMenu';

export const Header = () => (
  <>
    <header className="header">
      <div className="header__content">

        <Link
          to="/"
          className="logo header__logo"
        >
          <img
            className="logo__img"
            src="new/img/logo/logo.svg"
            alt="logo"
          />
        </Link>

        <BurgerMenu />

        <Navigation />
      </div>
    </header>
  </>
);
