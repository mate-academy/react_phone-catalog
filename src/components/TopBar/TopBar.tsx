import { Link, useSearchParams } from 'react-router-dom';
import { PathType } from '../../types/Types';
import { Icon } from '../ui/Icon/Icon';
import { Nav } from '../Nav';
import style from './TopBar.module.scss';
import { getSearchWith } from '../../utils/searchHelper';
import { useTheme } from '../../context/ThemeContext';
import classNames from 'classnames';
import { Search } from '../Search';

export const TopBar = () => {
  const { theme, themeToggle } = useTheme();

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
          to={PathType.FAVOURITES}
          className={classNames(
            style.topBar__actionLink,
            style['topBar__actionLink--fixed'],
          )}
        >
          <div className={style.topBar__containerIcon}>
            <Icon className={style.topBar__iconAction} nameIcon="favorites" />
          </div>
        </Link>

        <Link to={PathType.CART} className={style.topBar__actionLink}>
          <div className={style.topBar__containerIcon}>
            <Icon className={style.topBar__iconAction} nameIcon="cart" />
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
