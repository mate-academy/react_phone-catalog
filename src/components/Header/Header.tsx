import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
// import logo from '../../../public/_new/img/picthree.bdd2e0fc.png';

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
            src="/_new/img/logo/logo.svg"
            alt="logo"
          />
        </Link>
        <Navigation />
      </div>
    </header>
  </>
);
