import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { useEffect, useState } from 'react';
import { MobileNavigation } from './MobileNavigation';
import { useCartQuantity } from '../../modules/CartPage/CartPage';

export const Navigation = () => {
  const [favCount, setFavCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const cartCount = useCartQuantity();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 639);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const refreshCounts = () => {
    const favorites = JSON.parse(localStorage.getItem('FavoriteStore') || '[]');

    setFavCount(favorites.length);
  };

  useEffect(() => {
    refreshCounts();

    window.addEventListener('cartUpdated', refreshCounts);
    window.addEventListener('favUpdated', refreshCounts);
    window.addEventListener('delete-update', refreshCounts);

    window.addEventListener('storage', refreshCounts);

    return () => {
      window.removeEventListener('cartUpdated', refreshCounts);
      window.removeEventListener('favUpdated', refreshCounts);
      window.removeEventListener('storage', refreshCounts);
      window.removeEventListener('delete-update', refreshCounts);
    };
  }, []);

  return (
    <nav className="navbar">
      {!isMobile ? (
        <>
          <div className="navbar__content">
            <div className="navbar__left-container">
              <NavLink className="navbar__logo-button" to={'/'}>
                <img
                  className="navbar__logo"
                  src={`${import.meta.env.BASE_URL}serviceImg/logo.svg`}
                  alt="logo"
                />
              </NavLink>

              <div className="navbar__link">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'navbar__button--active' : 'navbar__button'
                  }
                  to={'/'}
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'navbar__button--active' : 'navbar__button'
                  }
                  to={'/phones'}
                >
                  Phones
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'navbar__button--active' : 'navbar__button'
                  }
                  to={'/tablets'}
                >
                  Tablets
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'navbar__button--active' : 'navbar__button'
                  }
                  to={'/accessories'}
                >
                  Accessories
                </NavLink>
              </div>
            </div>

            <div className="navbar__right-container">
              {favCount === 0 ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `navbar__icon navbar__icon--heart-empty
                    navbar__button--active`
                      : `navbar__icon navbar__icon--heart-empty
                    navbar__icon--heart-counter`
                  }
                  to="/favorites"
                />
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `navbar__icon navbar__icon--heart-empty
                    navbar__button--active`
                      : 'navbar__icon navbar__icon--heart-empty'
                  }
                  to="/favorites"
                >
                  <div className="navbar__icon-large__inner">
                    <span className="navbar__icon-counter ">{favCount}</span>
                  </div>
                </NavLink>
              )}

              {cartCount === 0 ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `navbar__icon navbar__icon--shopping-bag
                    navbar__button--active`
                      : 'navbar__icon navbar__icon--shopping-bag'
                  }
                  to="/cart"
                ></NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `navbar__icon navbar__icon--shopping-bag
                    navbar__button--active`
                      : 'navbar__icon navbar__icon--shopping-bag'
                  }
                  to="/cart"
                >
                  <div className="navbar__icon-large__inner">
                    <span className="navbar__icon-counter">{cartCount}</span>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar__content">
            <div className="navbar__left-container">
              <NavLink className="navbar__logo-button" to={'/'}>
                <img
                  className="navbar__logo"
                  src={`${import.meta.env.BASE_URL}serviceImg/logo.svg`}
                  alt="logo"
                />
              </NavLink>
            </div>

            <div className="navbar__right-container">
              <button
                type="button"
                className={
                  mobileNavActive
                    ? 'navbar__icon navbar__icon--close'
                    : 'navbar__icon navbar__icon--menu'
                }
                onClick={() => setMobileNavActive(!mobileNavActive)}
              ></button>
            </div>
          </div>

          {mobileNavActive && (
            <MobileNavigation onLinkClick={() => setMobileNavActive(false)} />
          )}
        </>
      )}
    </nav>
  );
};

export default Navigation;
