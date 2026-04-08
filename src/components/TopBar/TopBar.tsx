import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { PathType } from '../../types/Types';
import { Icon } from '../ui/Icon/Icon';
import { Nav } from '../Nav';
import style from './TopBar.module.scss';
import { getSearchWith } from '../../utils/searchHelper';
import { useTheme } from '../../context/ThemeContext';
import classNames from 'classnames';
import { Search } from '../Search';
import { useFavorite } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';

export const TopBar = () => {
  const { theme, themeToggle } = useTheme();
  const { pathname } = useLocation();

  const { favorites } = useFavorite();
  const countFavoriteItems = favorites.length;

  const { cartItems } = useCart();
  const countCartItems = cartItems.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const sideMenu = searchParams.get('sideMenu');

  const handleMenuClikc = () => {
    const param = { sideMenu: sideMenu ? null : 'open' };

    setSearchParams(getSearchWith(searchParams, param));
  };

  return (
    <div className={style.topBar}>
      <Link to={PathType.HOME} className={style.topBar__iconLogo}>
        <Icon className={style.topBar__logo} nameIcon="logo" />
      </Link>

      <Nav />

      <div className={style.topBar__actions}>
        <Search />
        <button className={style.topBar__button} onClick={themeToggle}>
          <div className={style.topBar__containerIcon}>
            <Icon className={style.topBar__iconAction} nameIcon={theme} />
          </div>
        </button>

        <Link
          to={{
            pathname: PathType.FAVOURITES,
            search: searchParams.toString(),
          }}
          className={classNames(
            style.topBar__actionLink,
            style['topBar__actionLink--fixed'],
            {
              [style['topBar__actionLink--active']]:
                pathname === `/${PathType.FAVOURITES}`,
            },
          )}
        >
          <div className={style.topBar__containerIcon}>
            <Icon className={style.topBar__iconAction} nameIcon="favorites" />

            {countFavoriteItems > 0 && (
              <span className={style.topBar__countFavorite}>
                {countFavoriteItems}
              </span>
            )}
          </div>
        </Link>

        <Link
          to={{ pathname: PathType.CART, search: searchParams.toString() }}
          className={classNames(style.topBar__actionLink, {
            [style['topBar__actionLink--active']]:
              pathname === `/${PathType.CART}`,
          })}
        >
          <div className={style.topBar__containerIcon}>
            <Icon className={style.topBar__iconAction} nameIcon="cart" />

            {countCartItems > 0 && (
              <span className={style.topBar__countFavorite}>
                {countCartItems}
              </span>
            )}
          </div>
        </Link>

        <button className={style.topBar__button} onClick={handleMenuClikc}>
          <div className={style.topBar__containerIcon}>
            <Icon
              className={style.topBar__iconAction}
              nameIcon={sideMenu ? 'close' : 'menu'}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
