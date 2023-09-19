import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';

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
            src="new/img/icons/logo.png"
            alt="logo"
          />
        </Link>
        <Navigation />
      </div>
    </header>
  </>
);
