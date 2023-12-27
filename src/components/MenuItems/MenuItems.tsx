import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';

import { AppContext } from '../../store/AppProvider';
import { Search } from '../Search';

import './MenuItems.scss';

export const MenuItems = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {
    favorites,
    cart,
  } = useContext(AppContext);

  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((a, item) => a + item.quantity, 0);

  const isTarget = (path: string) => {
    return location.pathname === path;
  };

  const isSearch = location.pathname.match(
    /\/phones(?=$)|\/tablets(?=$)|\/accessories(?=$)|\/favorites(?=$)/gi,
  );
  const isCartPage = location.pathname.startsWith('/cart');

  return (
    <>
      {!isCartPage && (
        <div className="MenuItems MenuItems__container">
          <Link
            to="/"
            className={cn('MenuItems__link', {
              'MenuItems__link--target': isTarget('/'),
            })}
          >
            home
          </Link>

          <Link
            to="/phones"
            className={cn('MenuItems__link', {
              'MenuItems__link--target': isTarget('/phones'),
            })}
          >
            phones
          </Link>

          <Link
            to="/tablets"
            className={cn('MenuItems__link', {
              'MenuItems__link--target': isTarget('/tablets'),
            })}
          >
            tablets
          </Link>

          <Link
            to="/accessories"
            className={cn('MenuItems__link', {
              'MenuItems__link--target': isTarget('/accessories'),
            })}
          >
            accessories
          </Link>
        </div>
      )}

      <div className="MenuItems__buttons">
        {isSearch && (
          <div className="MenuItems__search">
            <Search />
          </div>
        )}

        {!isCartPage && (
          <div className="MenuItems__button">
            <Link
              to="/favorites"
              state={{
                from: location.pathname,
                search: searchParams.toString(),
              }}
              className={cn('MenuItems__icon', 'icon--favourites', {
                'MenuItems__link--target': isTarget('/favorites'),
              })}
            />
            {favoritesCount > 0 && (
              <span className="MenuItems__icon__counter">
                {favoritesCount}
              </span>
            )}
          </div>
        )}

        <div className="MenuItems__button">
          <Link
            to="/cart"
            state={{
              from: location.pathname,
              search: searchParams.toString(),
            }}
            className={cn('MenuItems__icon', 'icon--bag', {
              'MenuItems__link--target': isTarget('/cart'),
            })}
          />
          {cartCount > 0 && (
            <span className="MenuItems__icon__counter">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
