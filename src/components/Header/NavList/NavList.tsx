import { useContext } from 'react';
import { LanguageContext } from '../../../store/LanguageProvider';
import style from './NavList.module.scss';
import { NAV__LIST } from '../../../constants/NAV__LIST';
import { NavLink } from 'react-router-dom';
import { StateContext } from '../../../store/StateProvider';
import classNames from 'classnames';
export const NavList = () => {
  const { t } = useContext(LanguageContext);
  const { setActiveMenu } = useContext(StateContext);

  const isActiveClass = ({ isActive }: { isActive: boolean }) =>
    classNames(style.nav__link, { [style.nav__activeLink]: isActive });

  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        {NAV__LIST.map(item => (
          <li className={style.nav__item} key={item}>
            <NavLink
              to={
                item.toLocaleLowerCase() === 'home'
                  ? '/'
                  : item.toLocaleLowerCase()
              }
              className={isActiveClass}
              onClick={() => setActiveMenu(false)}
            >
              {t(`${item.toLowerCase()}`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
