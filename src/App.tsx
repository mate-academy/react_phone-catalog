import { Link, NavLink, Outlet } from 'react-router-dom';
import './App.scss';

export const App = () => {
  return (
    <>
      <header className="header">
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
            <NavLink to="/" className="header__nav--link">
              HOME
            </NavLink>

            <NavLink to="/phones" className="header__nav--link">
              PHONES
            </NavLink>

            <NavLink to="/tablets" className="header__nav--link">
              TABLETS
            </NavLink>

            <NavLink to="/accessories" className="header__nav--link">
              ACCESSORIES
            </NavLink>
          </nav>
        </div>

        <div className="header__container">
          <div className="header__icons">
            <NavLink to="/">
              <img
                src="img/mine/icons/Favourites (Heart Like).svg"
                alt="Like"
              />
            </NavLink>
          </div>

          <div className="header__icons">
            <NavLink to="/">
              <img src="img/mine/icons/Shopping bag (Cart).svg" alt="Cart" />
            </NavLink>
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer />

    </>
  );
};
