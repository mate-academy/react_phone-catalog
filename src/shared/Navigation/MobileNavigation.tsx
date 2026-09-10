import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Props = {
  onLinkClick: () => void;
};

export const MobileNavigation = ({ onLinkClick }: Props) => {
  const [favCount, setFavCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const refreshCounts = () => {
    const favorites = JSON.parse(localStorage.getItem('FavoriteStore') || '[]');
    const cart = JSON.parse(localStorage.getItem('CartStore') || '[]');

    setFavCount(favorites.length);
    setCartCount(cart.length);
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
    <div className="navbar--mobile__content">
      <div className="navbar-mobile__top">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navbar__button--active' : 'navbar__button'
          }
          to={'/'}
          onClick={onLinkClick}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navbar__button--active' : 'navbar__button'
          }
          to={'/phones'}
          onClick={onLinkClick}
        >
          Phones
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navbar__button--active' : 'navbar__button'
          }
          to={'/tablets'}
          onClick={onLinkClick}
        >
          Tablets
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navbar__button--active' : 'navbar__button'
          }
          to={'/accessories'}
          onClick={onLinkClick}
        >
          Accessories
        </NavLink>
      </div>
      <div className="navbar-mobile__down">
        {favCount === 0 ? (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `navbar__icon-large navbar__icon--heart-empty
                    navbar-mobile__button--active`
                : `navbar__icon-large navbar__icon--heart-empty
                    navbar__icon--heart-counter`
            }
            to="/favorites"
            onClick={onLinkClick}
          />
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `navbar__icon-large navbar__icon--heart-empty
                    navbar-mobile__button--active`
                : 'navbar__icon-large navbar__icon--heart-empty'
            }
            to="/favorites"
            onClick={onLinkClick}
          >
            <div className="navbar__icon-large__inner">
              <span className="navbar__icon-counter navbar__icon-counter-large">
                {favCount}
              </span>
            </div>
          </NavLink>
        )}

        {cartCount === 0 ? (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `navbar__icon-large navbar__icon--shopping-bag
                    navbar-mobile__button--active`
                : 'navbar__icon-large navbar__icon--shopping-bag'
            }
            to="/cart"
            onClick={onLinkClick}
          ></NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `navbar__icon-large navbar__icon--shopping-bag
                    navbar-mobile__button--active`
                : 'navbar__icon-large navbar__icon--shopping-bag'
            }
            to="/cart"
            onClick={onLinkClick}
          >
            <div className="navbar__icon-large__inner">
              <span className="navbar__icon-counter navbar__icon-counter-large">
                {cartCount}
              </span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;
