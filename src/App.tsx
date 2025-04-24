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

export const App = () => {
  const [clickOnLogoBar, setClickOnLogoBar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 639);

  const links = ['home', 'phones', 'tablets', 'accessories'];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 639);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <h1 hidden>Product Catalog</h1>
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
                    <img
                      src="../../public/img/navbar/Logo.png"
                      alt="logo-gadgets"
                    />
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
                  {['like', 'shopping-cart'].map(route => (
                    <button
                      key={route}
                      className={classNames('navbar__button', {
                        hidden: !isMobile || clickOnLogoBar,
                      })}
                    >
                      <NavLink
                        aria-current="page"
                        className={`navbar__icon__${route === 'like' ? 'like' : 'cart'}`}
                        to={`/${route}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="navbar__burger">
                  <button
                    className="navbar__button-burger"
                    onClick={() =>
                      !isMobile && setClickOnLogoBar(prev => !prev)
                    }
                    hidden={!isMobile && clickOnLogoBar === true}
                  >
                    <NavLink
                      aria-current="page"
                      className="navbar__icon__menu"
                      to={'/Menu'}
                    ></NavLink>
                  </button>

                  <button
                    className="navbar__button-burger"
                    onClick={() =>
                      !isMobile && setClickOnLogoBar(prev => !prev)
                    }
                    hidden={!isMobile && clickOnLogoBar === false}
                  >
                    <NavLink
                      aria-current="page"
                      className={'navbar__icon__close'}
                      to="/"
                    ></NavLink>
                  </button>
                </div>
              </nav>
            </header>

            {clickOnLogoBar && (
              <aside className="menu">
                <ul className="menu__brand">
                  {links.map((item, index) => (
                    <li className="menu__item" key={index}>
                      <NavLink
                        className={({ isActive }) =>
                          classNames('menu__link', {
                            'has-background-grey-lighter': isActive,
                          })
                        }
                        to={item === 'home' ? '/' : `/${item}`}
                        // onClick={() => setClickOnLogoBar(false)}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="menu__right">
                  {[
                    { to: '/like', className: 'menu__icon__like' },
                    { to: '/shopping-cart', className: 'menu__icon__cart' },
                  ].map(({ to, className }) => (
                    <button className="menu__button" key={to}>
                      <NavLink
                        aria-current="page"
                        className={className}
                        to={to}
                        onClick={() => setClickOnLogoBar(false)}
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
              <NavLink
                className="footer__link__logo"
                to="/"
                onClick={() => {
                  setClickOnLogoBar(true);
                  checkClickOnLogoBar();
                }}
              >
                <img
                  src="../../public/img/navbar/Logo.png"
                  alt="logo-gadgets"
                />
              </NavLink>
              <ul className="footer__brand">
                <li className="footer__item">
                  <NavLink
                    className={({ isActive }) =>
                      classNames('footer__link', {
                        'has-background-grey-lighter': isActive,
                      })
                    }
                    to="/github"
                  >
                    Github
                  </NavLink>
                </li>
                <li className="footer__item">
                  <NavLink
                    aria-current="page"
                    className={({ isActive }) =>
                      classNames('footer__link', {
                        'has-background-grey-lighter': isActive,
                      })
                    }
                    to="/cotacts"
                  >
                    Cotacts
                  </NavLink>
                </li>
                <li className="footer__item">
                  <NavLink
                    aria-current="page"
                    className={({ isActive }) =>
                      classNames('footer__link', {
                        'has-background-grey-lighter': isActive,
                      })
                    }
                    to="/rights"
                  >
                    Rights
                  </NavLink>
                </li>
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
