import { Link, NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';
import { MenuItems } from './types/MenuItems';

export const App = () => {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="header__content">
            <Link to="/" className="logo header__logo">Logo</Link>

            <nav className="nav">
              <ul className="nav__list">
                {Object.values(MenuItems).map(item => (
                  <li key={item} className="nav__item">
                    <NavLink
                      to={item === 'home' ? '/' : item}
                      className={
                        ({ isActive }) => classNames('nav__link', {
                          'nav__link--active': isActive,
                        })
                      }
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <NavLink
              to="favourites"
              className="header__link header__link--favourites"
            />

            <Link
              to="cart"
              className="header__link header__link--cart"
            />
          </div>
        </div>
      </header>

      <main>
        <div className="container container--main">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container container--main">
          <div className="footer__content">
            <Link to="/" className="logo footer__logo">Logo</Link>

            <nav className="nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <a
                    // eslint-disable-next-line max-len
                    href="https://github.com/denis-kononenko/react_phone-catalog"
                    className="nav__link"
                  >
                    Github
                  </a>
                </li>

                <li className="nav__item">
                  <a href="#contacts" className="nav__link">Contacts</a>
                </li>

                <li className="nav__item">
                  <a href="#rights" className="nav__link">Rights</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};
