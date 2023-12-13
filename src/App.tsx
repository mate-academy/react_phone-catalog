import { Link, NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { Footer } from './components/Footer/Footer';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__nav-link', { 'header__is-active': isActive },
);

export const App = () => {
  return (
    <>
      <header className="header" id="header">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/">
              <img
                src="img/mine/LOGO.svg"
                alt="Logo"
                className="header__logo_img"
              />
            </Link>
          </div>

          <nav className="header__nav">
            <div className="header__nav-item">
              <NavLink to="/" className={getLinkClass}>
                HOME
              </NavLink>
            </div>

            <div className="header__nav-item">
              <NavLink to="/phones" className={getLinkClass}>
                PHONES
              </NavLink>
            </div>

            <div className="header__nav-item">
              <NavLink to="/tablets" className={getLinkClass}>
                TABLETS
              </NavLink>
            </div>

            <div className="header__nav-item">
              <NavLink to="/accessories" className={getLinkClass}>
                ACCESSORIES
              </NavLink>
            </div>

          </nav>
        </div>

        <div className="header__container">
          <div className="header__icons">
            <NavLink to="/favorite" className={getLinkClass}>
              <img
                src="img/mine/icons/Favourites (Heart Like).svg"
                alt="Like"
              />
            </NavLink>
          </div>

          <div className="header__icons">
            <NavLink to="/cart" className={getLinkClass}>
              <img src="img/mine/icons/Shopping bag (Cart).svg" alt="Cart" />
            </NavLink>
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <Footer />
      </footer>

    </>
  );
};
