import './styles/App.scss';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  Link,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { Devices } from './modules/Devices/Devices';
import { ProductCard } from './modules/Devices/componets/ProductCard';
import { useSelectedProduct } from './utils/contexts/SelectedProductContext';
import { Favorites } from './modules/Devices/componets/Favorites';
import { Cart } from './modules/Devices/componets/Cart';
import { NotFoundPage } from './modules/Devices/componets/NotFoundPage';

export const App = () => {
  const location = useLocation();
  const { activeProducts, cartProducts, loading, isError } =
    useSelectedProduct();

  const staticRoutes = [
    '/',
    '/home',
    '/phones',
    '/favorites',
    '/cart',
    '/tablets',
    '/accessories',
  ];
  const dynamicRoutes = [
    '/phones/:productId',
    '/tablets/:productId',
    '/accessories/:productId', // Динамічний маршрут
  ];

  const isNotFoundPage = ![...staticRoutes, ...dynamicRoutes].some(route =>
    matchPath(route, location.pathname),
  );

  function openMenu(): void {
    const menu = document.getElementById('menu');
    const header = document.getElementById('header');

    if (menu && header) {
      menu.classList.add('open');
      header.classList.add('hidden');
    }
  }

  function closeMenu(): void {
    const menu = document.getElementById('menu');
    const header = document.getElementById('header');

    if (menu && header) {
      menu.classList.remove('open');
      header.classList.remove('hidden');
    }
  }

  return (
    <div className="App">
      <header className="header" id="header">
        <div className="header__top">
          <div className="header__top-section">
            <NavLink to="/">
              <img src="img/icons/logo.png" alt="Nice Gadgets Logo" />
            </NavLink>

            <nav className="header-nav">
              <ul className="header-nav__list">
                <li className="header-nav__item">
                  <NavLink to="/" className="header-nav__link">
                    Home
                  </NavLink>
                </li>
                <li className="header-nav__item">
                  <NavLink
                    to={{ pathname: '/phones', search: '?page=1&perPage=4' }}
                    className="header-nav__link"
                  >
                    Phones
                  </NavLink>
                </li>
                <li className="header-nav__item">
                  <NavLink
                    to={{ pathname: '/tablets', search: '?page=1&perPage=4' }}
                    className="header-nav__link"
                  >
                    Tablets
                  </NavLink>
                </li>
                <li className="header-nav__item">
                  <NavLink
                    to={{
                      pathname: '/accessories',
                      search: '?page=1&perPage=4',
                    }}
                    className="header-nav__link"
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header__tablet-icons">
            <div className="header__tablet-icons__1">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `icon icon--favourite ${isActive ? 'icon--active' : ''}`
                }
              ></NavLink>
              {activeProducts.length > 0 && (
                <span className="header__tablet-icons__1__circle">
                  {activeProducts.length}
                </span>
              )}
            </div>

            <div className="header__tablet-icons__1">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `icon icon--bag ${isActive ? 'icon--active' : ''}`
                }
              ></NavLink>
              {cartProducts.length > 0 && (
                <span className="header__tablet-icons__1__circle">
                  {cartProducts.length}
                </span>
              )}
            </div>
          </div>

          <div className="header__icons header__icons--menu">
            <a href="#" className="icon icon--menu" onClick={openMenu}></a>
          </div>
        </div>
      </header>

      <aside className="menu page__menu" id="menu">
        <div className="menu__top-section">
          <div className="menu__top">
            <NavLink to="/" onClick={closeMenu}>
              <img src="img/icons/logo_menu.png" alt="Nice Gadgets Logo" />
            </NavLink>

            <div className="header__icons">
              <a href="#" className="icon icon--close" onClick={closeMenu}></a>
            </div>
          </div>

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink className="nav__link" to="/" onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className="nav__link"
                  to={{ pathname: '/phones', search: '?page=1&perPage=4' }}
                  onClick={closeMenu}
                >
                  Phones
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className="nav__link"
                  to={{ pathname: '/tablets', search: '?page=1&perPage=4' }}
                  onClick={closeMenu}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className="nav__link"
                  to={{ pathname: '/accessories', search: '?page=1&perPage=4' }}
                  onClick={closeMenu}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="menu__bottom-section">
          <div className="menu__bottom-icon menu__bottom-icon--1">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `icon icon--bag ${isActive ? 'icon--active' : ''}`
              }
              onClick={closeMenu}
            ></NavLink>
            {cartProducts.length > 0 && (
              <span className="menu__bottom-icon__1__circle">
                {cartProducts.length}
              </span>
            )}
          </div>
          <div className="menu__bottom-icon menu__bottom-icon--2">
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `icon icon--favourite ${isActive ? 'icon--active' : ''}`
              }
              onClick={closeMenu}
            ></NavLink>
            {activeProducts.length > 0 && (
              <span className="menu__bottom-icon__1__circle">
                {activeProducts.length}
              </span>
            )}
          </div>
        </div>
      </aside>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/phones" element={<Devices type={'phones'} />} />
        <Route path="/phones/:productId" element={<ProductCard />} />

        <Route path="/tablets" element={<Devices type={'tablets'} />} />
        <Route path="/tablets/:productId" element={<ProductCard />} />

        <Route path="/accessories" element={<Devices type={'accessories'} />} />
        <Route path="/accessories/:productId" element={<ProductCard />} />

        <Route
          path="/favorites"
          element={<Favorites activeProducts={activeProducts} />}
        />
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer
        className={`footer ${
          isNotFoundPage ||
          (location.pathname === '/cart' && cartProducts.length === 0) ||
          (location.pathname === '/favorites' && activeProducts.length === 0) ||
          location.pathname === '/phones/*' ||
          loading ||
          isError
            ? 'footer--not-found'
            : ''
        }`}
      >
        <div className="container">
          <div className="footer__content">
            <a href="#">
              <img src="img/icons/Logo__footer.svg" alt="" />
            </a>
            <nav className="footer-nav">
              <ul className="footer-nav__list">
                <li className="footer-nav__item">
                  <a href="" className="footer-nav__link link">
                    Github
                  </a>
                </li>
                <li className="footer-nav__item">
                  <a href="" className="footer-nav__link link">
                    Contacts
                  </a>
                </li>
                <li className="footer-nav__item">
                  <a href="" className="footer-nav__link link">
                    Rights
                  </a>
                </li>
              </ul>
            </nav>
            <div className="footer__button">
              <a href="" className="footer__button__link">
                Back to top
              </a>
              <Link
                to="#"
                onClick={() => {
                  const header = document.getElementById('header');

                  if (header) {
                    header.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div className="circle">
                  <div className="arrow-up"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
