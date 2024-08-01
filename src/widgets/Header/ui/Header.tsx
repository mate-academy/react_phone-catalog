import { NavLink } from 'react-router-dom';
import { RoutePaths } from '../../../shared/config/routeConfig';
import { useTheme } from '../../../app/providers/ThemeProvider';
import cls from './header.module.scss';
import classNames from 'classnames';
import { HeaderItemType } from '../model/types/header';
import { useMemo } from 'react';
import { MainLogo } from '../../MainLogo';

const headerItemsList: HeaderItemType[] = [
  {
    path: RoutePaths.home,
    text: 'home',
  },
  {
    path: `${RoutePaths.products}phones`,
    text: 'Phones',
  },
  {
    path: `${RoutePaths.products}tablets`,
    text: 'tablets',
  },
  {
    path: `${RoutePaths.products}accessories`,
    text: 'accessories',
  },
];

export const Header = () => {
  const { toggleTheme } = useTheme();

  const setMenuLinkClasses = ({ isActive }: { isActive: boolean }) =>
    classNames(cls.menu__link, { [cls.active]: isActive });

  const itemsList = useMemo(
    () =>
      headerItemsList.map(item => (
        <li key={item.path} className={cls.menu__item}>
          <NavLink className={setMenuLinkClasses} to={item.path}>
            {item.text}
          </NavLink>
        </li>
      )),
    [],
  );

  return (
    <header className={cls.header}>
      <MainLogo />

      <div className={classNames(cls.header__menu, cls.menu)}>
        <button
          type="button"
          className={classNames(cls.menu__icon, cls['icon-menu'])}
        >
          <span></span>
        </button>
        <nav className={cls.menu__body}>
          <ul className={cls.menu__list}>
            {itemsList}
            {/* <li className={cls.menu__item}>
              <NavLink className="menu__link" to={RoutePaths.product}>
                fav
              </NavLink>
            </li>
            <li className={cls.menu__item}>
              <NavLink className="menu__link" to={RoutePaths.product}>
                cart
              </NavLink>
            </li> */}
          </ul>
        </nav>

        <button type="button" className="button" onClick={toggleTheme}>
          Змінити тему
        </button>
      </div>
    </header>
  );
};
