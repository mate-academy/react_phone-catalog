import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header" id="#/">
      <div className="header__container">
        <Link to="/" className="header__logo-link">
          <img
            src="/img/logo/logo-mobile.svg"
            alt="logo"
            className="header__logo logo"
          />
        </Link>

        <div className="header__nav">
          <Link to="home" className="header__nav-link navigation-title">
            home
          </Link>
          <Link to="phones" className="header__nav-link navigation-title">
            phones
          </Link>
          <Link to="tablets" className="header__nav-link navigation-title">
            tablets
          </Link>
          <Link to="accessories" className="header__nav-link navigation-title">
            accessories
          </Link>
        </div>

        <div className="icon-wrapper">
          <Link
            to="favourites"
            className="icon-container header__navbar-favourites"
          >
            <img
              src="/img/icons/favourites.svg"
              alt="favourites"
              className="icon icon-favourites"
            />
          </Link>

          <Link
            to="shopping-cart"
            className="icon-container header__navbar-shopping-cart"
          >
            <img
              src="/img/icons/shopping-cart.svg"
              alt="shoping cart"
              className="icon icon--shopping-cart"
            />
          </Link>

          <Link to="menu" className="icon-container header__navbar-menu">
            <img
              src="/img/icons/menu.svg"
              alt="menu"
              className="icon icon--menu"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
