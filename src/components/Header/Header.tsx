import { NavLink, useSearchParams } from 'react-router-dom';
import open from '../../../public/img/my-icon/menu.svg';
import withOpen from '../../../public/img/theme-dark/menu.svg';
import shopping from '../../../public/img/my-icon/shopping.svg';
import shoppingDark from '../../../public/img/theme-dark/shopping.svg';
import favorites from '../../../public/img/my-icon/favorites.svg';
import favoritesDark from '../../../public/img/theme-dark/favorites.svg';
import close from '../../../public/img/my-icon/close.svg';
import withClose from '../../../public/img/theme-dark/close.svg';
import style from './Header.module.scss';
import cn from 'classnames';

import { useContext } from 'react';
import { Navigate } from './component';
import { StateContext } from '../../provider/GlobalProvider';

import { SearchLink } from '../../utils/SearchLink';
import { ThemeContext } from '../../provider/ThemeContextProvider';
import { ThemeSwitcher } from './component/ThemeSwitcher';

export const Header = () => {
  const { favoritesList, shopList } = useContext(StateContext);
  const { theme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();

  const menuStatus = searchParams.get('menu') === 'open';

  const favoritesCount = favoritesList.length;
  const shopCount = shopList.reduce((sum, { quantity }) => sum + quantity, 0);

  const menu = {
    close: theme === 'white' ? open : withOpen,
    open: theme === 'white' ? close : withClose,
  };

  const getLinkShop = ({ isActive }: { isActive: boolean }) =>
    cn(style.shopping__link, {
      [style.active]: isActive,
    });

  return (
    <header className={style.header}>
      <Navigate />

      <ThemeSwitcher />

      <div className={style.shopping}>
        <NavLink className={getLinkShop} to={'favorites'}>
          <div className={style.shopping__wrapper}>
            <img
              className={style.shopping__icon}
              src={theme === 'white' ? favorites : favoritesDark}
              alt="favorites"
            />
            {favoritesCount > 0 && (
              <div className={style['shopping__link--count']}>
                {favoritesCount}
              </div>
            )}
          </div>
        </NavLink>
        <NavLink className={getLinkShop} to={'shop'}>
          <div className={style.shopping__wrapper}>
            <img
              src={theme === 'white' ? shopping : shoppingDark}
              alt="shopping"
            />
            {shopCount > 0 && (
              <div className={style['shopping__link--count']}>{shopCount}</div>
            )}
          </div>
        </NavLink>
      </div>

      <div className={style.menu}>
        <SearchLink
          className={style.menu__button}
          params={{ menu: menuStatus ? null : 'open' }}
        >
          <img src={menuStatus ? menu.open : menu.close} alt="menu" />
        </SearchLink>
      </div>
    </header>
  );
};
