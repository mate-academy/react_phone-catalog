/* eslint-disable max-len */
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/Home/HomePage';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PhonePage } from './modules/ProductPages/PhonePage';
import { TabletsPage } from './modules/ProductPages/TabletsPage';
import { Accessories } from './modules/ProductPages/Accessuries';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { useCart } from './modules/CartContext/CartContext';
import { FavoritesPages } from './modules/FavoritesPage/FavoritesPage';

export const App = () => {
  const [clickOnLogoBar, setClickOnLogoBar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);
  const { cartItems, favoriteItems } = useCart();
  const cartCount = cartItems.length;
  const favoriteCount = favoriteItems.length;

  const links = ['home', 'phones', 'tablets', 'accessories'];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('clickOnLogoBar', JSON.stringify(clickOnLogoBar));
  }, [clickOnLogoBar]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const checkClickOnLogoBar = () => {
    if (clickOnLogoBar === true) {
      setClickOnLogoBar(false);
    } else {
      setClickOnLogoBar(true);
    }
  };

  return (
    <HashRouter>
      <div className="App">
        <div className="section">
          <div className="container">
            <h1 className="product__catalog" hidden>
              Product Catalog
            </h1>
            <header className="nav">
              <nav
                data-cy="nav"
                className="navbar is-fixed-top has-shadow"
                role="navigation"
                aria-label="main navigation"
              >
                <ul className="navbar__brand">
                  <NavLink
                    className="navbar__link__logo"
                    to={isMobile ? '/' : '/Menu'}
                    onClick={e => {
                      if (isMobile) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <img src="./img/navbar/Logo.png" alt="logo-gadgets" />
                  </NavLink>
                  {links.map((item, index) => (
                    <li className="navbar__item" key={index}>
                      <NavLink
                        className={({ isActive }) =>
                          classNames('navbar__link', {
                            'has-background-grey-lighter': isActive,
                          })
                        }
                        to={item === 'home' ? '/' : `/${item}`}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="navbar__right">
                  {['favorites', 'cart'].map(route => {
                    const isCart = route === 'cart';
                    const isFavorite = route === 'favorites';
                    const isActive = location.pathname === `/${route}`;

                    return (
                      <button
                        key={route}
                        className={classNames('navbar__button', {
                          hidden: !isMobile || clickOnLogoBar,

                          active: isActive,
                        })}
                      >
                        <NavLink
                          aria-current="page"
                          className={`navbar__icon__${isCart ? 'cart' : 'like'}`}
                          to={`/${route}`}
                        >
                          {isCart && cartItems.length > 0 && (
                            <span className="navbar__badge">{cartCount}</span>
                          )}
                          {isFavorite && favoriteItems.length > 0 && (
                            <span className="navbar__badge">
                              {favoriteCount}
                            </span>
                          )}
                        </NavLink>
                      </button>
                    );
                  })}
                </div>
                <div className="navbar__burger">
                  {isMobile && (
                    <button
                      className="navbar__button-burger"
                      onClick={() => setClickOnLogoBar(prev => !prev)}
                    >
                      <NavLink
                        className={
                          clickOnLogoBar
                            ? 'navbar__icon__close'
                            : 'navbar__icon__menu'
                        }
                        to="/"
                      />
                    </button>
                  )}
                </div>
              </nav>
            </header>

            {/* Меню (буде відображатися, якщо clickOnLogoBar == true) */}
            {clickOnLogoBar && (
              <aside className={clickOnLogoBar ? 'menu menu--open' : 'menu'}>
                <ul className="menu__brand">
                  {links.map((item, index) => (
                    <li className="menu__item" key={index}>
                      <NavLink
                        className={({ isActive }) =>
                          `menu__link ${isActive ? 'has-background-grey-lighter' : ''}`
                        }
                        to={item === 'home' ? '/' : `/${item}`}
                        onClick={() => setClickOnLogoBar(false)}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="menu__right">
                  {[
                    { to: '/favorites', className: 'menu__icon__like' },
                    { to: '/cart', className: 'menu__icon__cart' },
                  ].map(({ to, className }) => (
                    <button className="menu__button" key={to}>
                      <NavLink
                        aria-current="page"
                        className={className}
                        to={to}
                        onClick={() => {
                          setClickOnLogoBar(false);
                        }}
                      />
                    </button>
                  ))}
                </div>
              </aside>
            )}

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonePage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route
                path="/:category/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/favorites" element={<FavoritesPages />}></Route>
              <Route path="/Menu" element={<aside></aside>} />
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Routes>

            <footer
              data-cy="footer"
              className="footer is-fixed-top has-shadow"
              role="footer"
              aria-label="main footer"
            >
              <ul className="footer__brand">
                <NavLink
                  className="footer__link__logo"
                  to="/"
                  onClick={() => {
                    setClickOnLogoBar(true);
                    checkClickOnLogoBar();
                  }}
                >
                  <img src="./img/navbar/Logo.png" alt="logo-gadgets" />
                </NavLink>

                {['github', 'contacts', 'rights'].map((item, index) => (
                  <li className="footer__item" key={index}>
                    <NavLink
                      className={({ isActive }) =>
                        classNames('footer__link', {
                          'has-background-grey-lighter': isActive,
                        })
                      }
                      to={
                        item === 'github'
                          ? 'https://github.com/vikaruda?tab=repositories'
                          : `/${item}`
                      }
                      target={item === 'github' ? '_blank' : undefined}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="footer__right">
                <NavLink
                  aria-current="page"
                  className={({ isActive }) =>
                    classNames('footer__link', {
                      'has-background-grey-lighter': isActive,
                    })
                  }
                  to="/top"
                >
                  Back to top
                </NavLink>
                <button className="footer__button" onClick={scrollTop}></button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};
