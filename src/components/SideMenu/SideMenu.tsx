import style from './SideMenu.module.scss';

import { Nav } from '../Nav';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { PathType } from '../../types/Types';
import { Icon } from '../ui/Icon/Icon';
import { getSearchWith } from '../../utils/searchHelper';

export const SideMenu = () => {
  const [searchParams] = useSearchParams();
  const sideMenu = searchParams.get('sideMenu');

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
        )}
      >
        <div className={style.sideMenu__containerIcon}>
          <Icon className={style.sideMenu__iconAction} nameIcon="favorites" />
        </div>
      </Link>

      <Link
        to={PathType.CART}
        className={classNames(
          style.sideMenu__actionLink,
          style['sideMenu__actionLink--right'],
        )}
      >
        <div className={style.sideMenu__containerIcon}>
          <Icon className={style.sideMenu__iconAction} nameIcon="cart" />
        </div>
      </Link>
    </aside>
  );
};
