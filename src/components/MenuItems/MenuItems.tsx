import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
// import { Search } from '../Search/Search';
import './MenuItems.scss';

export const MenuItems = () => {
  const location = useLocation();
  const favoritesCount = 34;
  const cartCount = 12;

  const isTarget = (path: string) => {
    return location.pathname === path;
  };

  // const isPhonePage = (location.pathname.startsWith('/phones')
  //   || location.pathname.startsWith('/favorites')
  //   || location.pathname.startsWith('/tablets')
  //   || location.pathname.startsWith('/accessories'))
  //   && !location.pathname.match(/^\/phones\/[^/]+$/);

  const isCartPage = location.pathname.startsWith('/cart');

  return (
    <>
      {!isCartPage && (
        <div className="MenuItems MenuItems__container">
          <Link
            to="/"
            className={cn('MenuItems__link', {
              isTarget: isTarget('/'),
            })}
          >
            home
          </Link>

          <Link
            to="/phones"
            className={cn('MenuItems__link', {
              isTarget: isTarget('/phones'),
            })}
          >
            phones
          </Link>

          <Link
            to="/tablets"
            className={cn('MenuItems__link', {
              isTarget: isTarget('/tablets'),
            })}
          >
            tablets
          </Link>

          <Link
            to="/accessories"
            className={cn('MenuItems__link', {
              isTarget: isTarget('/accessories'),
            })}
          >
            accessories
          </Link>
        </div>
      )}

      <div className="MenuItems__buttons">
        {/* {isPhonePage && (
          <div className="MenuItems_search">
            <Search />
          </div>
        )} */}

        {!isCartPage && (
          <div className="MenuItems__button">
            <Link
              to="/favorites"
              className={cn('MenuItems__icon', 'icon--favourites', {
                isTarget: isTarget('/favorites'),
              })}
            />
            {favoritesCount > 0 && (
              <span className="MenuItems__icon__number">
                {favoritesCount}
              </span>
            )}
          </div>
        )}

        <div className="MenuItems__button">
          <Link
            to="/cart"
            className={cn('MenuItems__icon', 'icon--bag', {
              isTarget: isTarget('/cart'),
            })}
          />
          {cartCount > 0 && (
            <span className="MenuItems__icon__number">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
