import { Logo } from '../Icons/Logo';
import style from './AsideMenu.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext } from 'react';
import { LangButton } from '../Header/LangButton';
import ThemeButton from '../Header/ThemeButton/ThemeButton';
import { IconFavorites } from '../Icons/IconFavorites';
import { LogoCart } from '../Icons/IconCart';
import { LogoClose } from '../Icons/IconClose';
import data from '../../utils/NavList.json';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { StateContext } from '../../store/StateProvider';

export const AsideMenu = () => {
  const { t } = useContext(LanguageContext);
  const isActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(style.menu__listLink, { [style.menu__activeLink]: isActive });

  const { activeMenu, setActiveMenu } = useContext(StateContext);

  return (
    <aside
      className={classNames(style.menu, {
        [style.menu__active]: activeMenu,
      })}
    >
      <div className={style.menu__top}>
        <Link to="/home" onClick={() => setActiveMenu(false)}>
          <Logo className={style.menu__topLogo} />
        </Link>
        <button
          className={style.menu__closeButton}
          onClick={() => setActiveMenu(false)}
        >
          <LogoClose className={style.menu__icons} />
        </button>
      </div>

      <div className={style.menu__content}>
        <ul className={style.menu__contentList}>
          {data.map(item => (
            <li className={style.menu__listItem} key={item}>
              <NavLink
                to={
                  item.toLocaleLowerCase() === 'home'
                    ? '../'
                    : `../${item.toLocaleLowerCase()}`
                }
                className={isActiveLink}
                onClick={() => setActiveMenu(false)}
              >
                {t(`${item.toLowerCase()}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.menu__bottom}>
        <div className={style.menu__wrap}>
          <ThemeButton />
        </div>
        <div className={style.menu__wrap}>
          <LangButton />
        </div>
        <Link to="#" className={style.menu__wrap}>
          <IconFavorites className={style.menu__icons} />
        </Link>
        <Link to="#" className={style.menu__wrap}>
          <LogoCart className={style.menu__icons} />
        </Link>
      </div>
    </aside>
  );
};
