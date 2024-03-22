import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header" id="#/">
      <div className="header__container">
        <div className="navbar header__navbar">
          <Link to="/" className="header__logo-link">
            <img
              src="/img/logo/logo-mobile.svg"
              alt="logo"
              className="header__logo logo"
            />
          </Link>

          <div className="icon-wrapper icon-wrapper--right icon-wrapper--menu">
            <Link to="menu" className="header__navbar-menu">
              <img
                src="/img/icons/menu.svg"
                alt="menu"
                className="icon icon--menu"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
