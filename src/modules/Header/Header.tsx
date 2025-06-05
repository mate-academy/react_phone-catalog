import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { useEffect, useState } from 'react';

export const Header = () => {
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

  return (
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
            const isActive = location.href.includes(`/${route}`);

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
                    <span className="navbar__badge">{favoriteCount}</span>
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
                  clickOnLogoBar ? 'navbar__icon__close' : 'navbar__icon__menu'
                }
                to="/"
              />
            </button>
          )}
        </div>
      </nav>

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
    </header>
  );
};
