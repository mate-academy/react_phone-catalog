import { Logo } from '../Logos/Logo';
import style from './AsideMenu.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext } from 'react';
import { LangButton } from '../Header/LangButton';
import ThemeButton from '../Header/ThemeButton/ThemeButton';
import { LogoFavorites } from '../Logos/LogoFavorites';
import { LogoCart } from '../Logos/LogoCart';
import { LogoClose } from '../Logos/LogoClose';
import data from '../../utils/NavList.json';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const AsideMenu = () => {
  const { t } = useContext(LanguageContext);
  const location = useLocation();

  return (
    <aside
      className={classNames(style.menu, {
        [style.menu__active]: location.pathname === '/menu',
      })}
    >
      <div className={style.menu__top}>
        <Link to="/home">
          <Logo className={style.menu__topLogo} />
        </Link>
        <Link to="/home" className={style.menu__topLink}>
          <LogoClose className={style.menu__icons} />
        </Link>
      </div>

      <div className={style.menu__content}>
        <ul className={style.menu__contentList}>
          {data.map(item => (
            <li className={style.menu__listItem} key={item}>
              <Link
                to={`../${item.toLocaleLowerCase()}`}
                className={style.menu__listLink}
              >
                {t(`${item.toLowerCase()}`)}
              </Link>
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
          <LogoFavorites className={style.menu__icons} />
        </Link>
        <Link to="#" className={style.menu__wrap}>
          <LogoCart className={style.menu__icons} />
        </Link>
      </div>
    </aside>
  );
};
