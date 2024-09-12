/* eslint-disable no-param-reassign */
import { FC, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { RoutePaths } from '../../../shared/config/routeConfig';
import { HeaderItemType } from '../model/types/header';
import {
  LOCAL_STORAGE_CART_PRODUCTS,
  LOCAL_STORAGE_FAVORITES,
} from '../../../entities/Product';
import { MainLogo } from '../../MainLogo';
import { ThemeSwitcher } from '../../ThemeSwitcher';
import {
  ICartItemsLocalStorage,
  useLocalStorage,
} from '../../../shared/lib/hooks/useLocalStorage';
import icons from '../../../shared/styles/icons.module.scss';
import cls from './header.module.scss';

// interface MyCustomCSS extends CSSProperties {
//   '--rows': number;
//   '--rows-icons': number;
// }

export const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [favoriteLocalStorage] = useLocalStorage<string[]>(
    LOCAL_STORAGE_FAVORITES,
    [],
  );
  const [cartLocalStorage] = useLocalStorage<ICartItemsLocalStorage[]>(
    LOCAL_STORAGE_CART_PRODUCTS,
    [],
  );
  const [favoriteLocalStorageCount, setFavoriteLocalStorageCount] =
    useState<number>(favoriteLocalStorage.length);
  const [cartLocalStorageCount, setCartLocalStorageCount] = useState<number>(
    cartLocalStorage.reduce((acc, item) => (acc += item.count), 0),
  );

  useEffect(() => {
    const handleLocalStorageChange = (event: CustomEvent) => {
      const { key, value } = event.detail;

      if (key === LOCAL_STORAGE_FAVORITES) {
        setFavoriteLocalStorageCount(value.length);
      } else if (key === LOCAL_STORAGE_CART_PRODUCTS) {
        setCartLocalStorageCount(
          (value as ICartItemsLocalStorage[]).reduce(
            (acc, item) => (acc += item.count),
            0,
          ),
        );
      }
    };

    window.addEventListener(
      'localStorageChange',
      handleLocalStorageChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        'localStorageChange',
        handleLocalStorageChange as EventListener,
      );
    };
  }, []);

  const headerItemListIcons = useMemo<HeaderItemType[]>(
    () => [
      {
        path: `${RoutePaths.favorites}`,
        children: (
          <span
            data-position="first"
            data-count={
              favoriteLocalStorageCount > 0
                ? favoriteLocalStorageCount
                : undefined
            }
            className={classNames(icons['_icon-heart'], cls.icon)}
          ></span>
        ),
        isIcon: true,
      },
      {
        path: `${RoutePaths.cart}`,
        children: (
          <span
            data-count={
              cartLocalStorageCount > 0 ? cartLocalStorageCount : undefined
            }
            className={classNames(icons['_icon-cart'], cls.icon)}
          ></span>
        ),
        isIcon: true,
      },
    ],
    [cartLocalStorageCount, favoriteLocalStorageCount],
  );

  const headerItemsList = useMemo<HeaderItemType[]>(
    () => [
      {
        path: RoutePaths.home,
        children: 'home',
      },
      {
        path: `${RoutePaths.products}phones`,
        children: 'Phones',
      },
      {
        path: `${RoutePaths.products}tablets`,
        children: 'tablets',
      },
      {
        path: `${RoutePaths.products}accessories`,
        children: 'accessories',
      },
      ...headerItemListIcons,
    ],
    [headerItemListIcons],
  );

  const itemsList = useMemo(
    () =>
      headerItemsList.map(({ path, children, isIcon }) => (
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
            {children}
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
