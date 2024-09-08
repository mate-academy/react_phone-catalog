import { NavLink } from 'react-router-dom';
import { RoutePaths } from '../../../shared/config/routeConfig';
import { HeaderItemType } from '../model/types/header';
import { useMemo, useState } from 'react';
import { MainLogo } from '../../MainLogo';
import icons from '../../../shared/styles/icons.module.scss';
import { ThemeSwitcher } from '../../ThemeSwitcher';
import classNames from 'classnames';
import cls from './header.module.scss';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const headerItemsList: HeaderItemType[] = useMemo(
    () => [
      {
        path: RoutePaths.home,
        cildren: 'home',
      },
      {
        path: `${RoutePaths.products}phones`,
        cildren: 'Phones',
      },
      {
        path: `${RoutePaths.products}tablets`,
        cildren: 'tablets',
      },
      {
        path: `${RoutePaths.products}accessories`,
        cildren: 'accessories',
      },
      {
        path: `${RoutePaths.favorites}`,
        cildren: (
          <span
            data-position="first"
            className={classNames(icons['_icon-heart'], cls.icon)}
          ></span>
        ),
        isIcon: true,
      },
      {
        path: `${RoutePaths.cart}`,
        cildren: (
          <span className={classNames(icons['_icon-cart'], cls.icon)}></span>
        ),
        isIcon: true,
      },
    ],
    [],
  );

  const itemsList = useMemo(
    () =>
      headerItemsList.map(({ path, cildren, isIcon }) => (
        <li key={path} className={cls.menu__item}>
          <NavLink
            end
            className={({ isActive }: { isActive: boolean }) =>
              classNames(cls.menu__link, {
                [cls.active]: isActive,
                [cls.isIcon]: isIcon,
              })
            }
            to={path}
            onClick={() => setMenuOpen(false)}
          >
            {cildren}
          </NavLink>
        </li>
      )),
    [headerItemsList],
  );

  return (
    <header className={cls.header}>
      <MainLogo />

      <div
        className={classNames(cls.header__menu, cls.menu, {
          [cls['menu-open']]: menuOpen,
        })}
      >
        <button
          type="button"
          className={classNames(cls.menu__icon, {
            [cls.isIcon]: true,
          })}
          onClick={() => {
            setMenuOpen(prev => !prev);
          }}
        >
          <span className={cls['icon-menu']}>
            <span></span>
          </span>
        </button>

        <nav className={cls.menu__body}>
          <ul className={cls.menu__list}>{itemsList}</ul>

          <ThemeSwitcher
            className={classNames(
              cls['theme-switcher'],
              cls.menu__link,
              cls.isIcon,
            )}
          />
        </nav>
      </div>
    </header>
  );
};
