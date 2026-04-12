import { useState } from 'react';
import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { useProducts } from './components/context/ProductContext';

export const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites, getTotalItems } = useProducts();

  const favCount = favorites.length;
  const cartCount = getTotalItems();

  return (
    <div className="App">
      <div className="app__wrapper">
        <header className="header">
          <div className="header__left">
            <div className="header__logo-div">
              <img
                src={`${import.meta.env.BASE_URL}img/icons/logo.svg`}
                alt="header__logo"
                className="logo"
              />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? 'header__nav-link uppercase is-active'
                        : 'header__nav-link uppercase'
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/phones"
                    className={({ isActive }) =>
                      isActive
                        ? 'header__nav-link uppercase is-active'
                        : 'header__nav-link uppercase'
                    }
                  >
                    Phones
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/tablets"
                    className={({ isActive }) =>
                      isActive
                        ? 'header__nav-link uppercase is-active'
                        : 'header__nav-link uppercase'
                    }
                  >
                    Tablets
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/accessories"
                    className={({ isActive }) =>
                      isActive
                        ? 'header__nav-link uppercase is-active'
                        : 'header__nav-link uppercase'
                    }
                  >
                    Accessoires
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <ul className="header__icons-list">
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ? 'header__icons-item is-active' : 'header__icons-item'
              }
            >
              <div className="icon icon--favourite"></div>
              {favCount > 0 && (
                <div className="header__red small-text">{favCount}</div>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? 'header__icons-item is-active' : 'header__icons-item'
              }
            >
              <div className="icon icon--cart"></div>
              {cartCount > 0 && (
                <div className="header__red small-text">{cartCount}</div>
              )}
            </NavLink>
          </ul>

          <button
            className="header__icons-item menu__unlock button"
            onClick={() => setMenuOpen(true)}
          >
            <div className="icon icon--menu"></div>
          </button>
        </header>

        {menuOpen && (
          <div className="menu">
            <div className="menu__header">
              <div className="menu__logo">
                <img
                  src={`${import.meta.env.BASE_URL}img/icons/logo.svg`}
                  alt="logo"
                  className="menu__logo-img"
                />
              </div>
              <button
                className="button menu__button"
                onClick={() => setMenuOpen(false)}
              >
                <div className="icon icon--close"></div>
              </button>
            </div>

            <ul className="menu__list" onClick={() => setMenuOpen(false)}>
              <li className="menu__list-item">
                <NavLink
                  to={'/home'}
                  className={({ isActive }) =>
                    isActive
                      ? 'menu__list-link uppercase'
                      : 'menu__list-link uppercase menu__active'
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="menu__list-item">
                <NavLink
                  to={'/phones'}
                  className={({ isActive }) =>
                    isActive
                      ? 'menu__list-link uppercase'
                      : 'menu__list-link uppercase menu__active'
                  }
                >
                  Phones
                </NavLink>
              </li>
              <li className="menu__list-item">
                <NavLink
                  to={'/tablets'}
                  className={({ isActive }) =>
                    isActive
                      ? 'menu__list-link uppercase'
                      : 'menu__list-link uppercase menu__active'
                  }
                >
                  Tablets
                </NavLink>
              </li>
              <li className="menu__list-item">
                <NavLink
                  to={'/accessories'}
                  className={({ isActive }) =>
                    isActive
                      ? 'menu__list-link uppercase'
                      : 'menu__list-link uppercase menu__active'
                  }
                >
                  Accessories
                </NavLink>
              </li>
            </ul>

            <ul className="menu__icons">
              <li className="menu__icon">
                <div className="icon icon--favourite"></div>
                {favCount > 0 && (
                  <div className="menu__red small-text">{favCount}</div>
                )}
              </li>
              <li className="menu__icon">
                <div className="icon icon--cart"></div>
                {cartCount > 0 && (
                  <div className="menu__red small-text">{cartCount}</div>
                )}
              </li>
            </ul>
          </div>
        )}

        <Outlet />
      </div>

      <footer className="footer">
        <div className="footer__wrapper">
          <a href="#" className="footer__logo-div">
            <img
              src={`${import.meta.env.BASE_URL}img/icons/logo.svg`}
              alt="footer__logo"
              className="logo"
            />
          </a>
          <ul className="footer__list">
            <li className="footer__link uppercase">
              <a href="#" className="footer__link">
                Github
              </a>
            </li>
            <li className="footer__link uppercase">
              <a href="#" className="footer__link">
                Contacts
              </a>
            </li>
            <li className="footer__link uppercase">
              <a href="#" className="footer__link">
                Rights
              </a>
            </li>
          </ul>
          <div className="footer__back">
            <div className="small-text">Back to top</div>
            <a href="#" className="footer__back-button button">
              <div className="icon icon--up"></div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
