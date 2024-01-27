import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Search } from '../Search';

import './MenuItems.scss';
import { useAppSelector } from '../../store/hooks';

export const MenuItems = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { items: cart } = useAppSelector(state => state.cart);
  const { items: favorites } = useAppSelector(state => state.favorites);

  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((a, item) => a + item.quantity, 0);

  const isTarget = (path: string) => {
    return location.pathname === path;
  };

  const isSearch = location.pathname.match(
    /\/phones(?=$)|\/tablets(?=$)|\/accessories(?=$)|\/favorites(?=$)/gi,// eslint-disable-line
  );
  const isCartPage = location.pathname.startsWith('/cart');

  return (
    <>
      <div className="MenuItems MenuItems__container">
        <Link
          to="/"
          className={cn('MenuItems__link', {
            'MenuItems__link--selected': isTarget('/'),
          })}
        >
          home
        </Link>

        <Link
          to="/phones"
          className={cn('MenuItems__link', {
            'MenuItems__link--selected': isTarget('/phones'),
          })}
        >
          phones
        </Link>

        <Link
          to="/tablets"
          className={cn('MenuItems__link', {
            'MenuItems__link--selected': isTarget('/tablets'),
          })}
        >
          tablets
        </Link>

        <Link
          to="/accessories"
          className={cn('MenuItems__link', {
            'MenuItems__link--selected': isTarget('/accessories'),
          })}
        >
          accessories
        </Link>
      </div>

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
                'MenuItems__link--selected': isTarget('/favorites'),
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
              'MenuItems__link--selected': isTarget('/cart'),
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
