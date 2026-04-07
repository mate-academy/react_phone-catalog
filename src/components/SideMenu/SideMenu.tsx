import style from './SideMenu.module.scss';

import { Nav } from '../Nav';
import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { PathType } from '../../types/Types';
import { Icon } from '../ui/Icon/Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { useFavorite } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';
import { useEffect } from 'react';

export const SideMenu = () => {
  const [searchParams] = useSearchParams();
  const sideMenu = searchParams.get('sideMenu');

  const { pathname } = useLocation();

  const { favorites } = useFavorite();
  const countFavoriteItems = favorites.length;

  const { cartItems } = useCart();
  const countCartItems = cartItems.length;

  useEffect(() => {
    if (sideMenu) {
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [sideMenu]);

  return (
    <aside
      className={classNames(
        style.sideMenu,
        sideMenu && style['sideMenu--open'],
      )}
    >
      <Nav className="sideMenu__nav" />

      <Link
        to={{
          pathname: PathType.FAVOURITES,
          search: getSearchWith(searchParams, { sideMenu: null }),
        }}
        className={classNames(
          style.sideMenu__actionLink,
          style['sideMenu__actionLink--left'],
          {
            [style['sideMenu__actionLink--active']]:
              pathname === `/${PathType.FAVOURITES}`,
          },
        )}
      >
        <div className={style.sideMenu__containerIcon}>
          <Icon className={style.sideMenu__iconAction} nameIcon="favorites" />

          {countFavoriteItems && (
            <span className={style.sideMenu__countItems}>
              {countFavoriteItems}
            </span>
          )}
        </div>
      </Link>

      <Link
        to={{
          pathname: PathType.CART,
          search: getSearchWith(searchParams, { sideMenu: null }),
        }}
        className={classNames(
          style.sideMenu__actionLink,
          style['sideMenu__actionLink--right'],
          {
            [style['sideMenu__actionLink--active']]:
              pathname === `/${PathType.CART}`,
          },
        )}
      >
        <div className={style.sideMenu__containerIcon}>
          <Icon className={style.sideMenu__iconAction} nameIcon="cart" />

          {countCartItems && (
            <span className={style.sideMenu__countItems}>{countCartItems}</span>
          )}
        </div>
      </Link>
    </aside>
  );
};
