import { NavLink, useLocation } from 'react-router-dom';
import { useCartFavorites } from '../../providers/CartFavoritesProvider';
import { Search } from '../Search/Search';
import './MenuItems.scss';

export const MenuItems = () => {
  const location = useLocation();
  const { state: { cart, favorites } } = useCartFavorites();

  const favoritesCount = favorites.length;
  const cartCount = cart.length;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isPhonePage = (location.pathname.startsWith('/phones')
    || location.pathname.startsWith('/favorites')
    || location.pathname.startsWith('/tablets')
    || location.pathname.startsWith('/accessories'))
    && !location.pathname.match(/^\/phones\/[^/]+$/);

  const isCartPage = location.pathname.startsWith('/cart');

  return (
    <>
      {!isCartPage && (
        <div className="Menuitems_menu-items">
          <NavLink
            to="/"
            className={`Menuitems_link ${isActive('/') ? 'active' : ''}`}
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={`Menuitems_link ${isActive('/phones') ? 'active' : ''}`}
          >
            phones
          </NavLink>

          <NavLink
            to="/tablets"
            className={`Menuitems_link ${isActive('/tablets') ? 'active' : ''}`}
          >
            tablets
          </NavLink>

          <NavLink
            to="/accessories"
            className={`Menuitems_link ${isActive('/accessories') ? 'active' : ''}`}
          >
            accessories
          </NavLink>
        </div>
      )}

      <div className="Menuitems_buttons">
        {isPhonePage && (
          <div className="Menuitems_search">
            <Search />
          </div>
        )}
        {!isCartPage && (
          <div className="button-box">
            <NavLink
              to="/favorites"
              className={`Menuitems_icons Menuitems_icons-fav ${isActive('/favorites') ? 'active' : ''}`}
            >
              {favoritesCount > 0 && (
                <span className="Menuitems_icons-fav_length">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </div>
        )}

        <div className="button-box">
          <NavLink
            to="/cart"
            className={
              `Menuitems_icons Menuitems_icons-cart ${isActive('/cart') ? 'active' : ''}`
            }
          >
            {cartCount > 0 && (
              <span className="Menuitems_icons-cart_length">{cartCount}</span>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};
