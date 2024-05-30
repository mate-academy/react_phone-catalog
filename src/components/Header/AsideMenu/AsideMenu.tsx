import { Logo } from '../../Logo/Logo';
import style from './AsideMenu.module.scss';
import { LanguageContext } from '../../../store/LanguageProvider';
import { useContext } from 'react';
import { LangButton } from '../LangButton';
import ThemeButton from '../ThemeButton/ThemeButton';
import { LogoFavorites } from '../../Logo/LogoFavorites';
import { LogoCart } from '../../Logo/LogoCart';
import { LogoClose } from '../../Logo/LogoClose';
import data from '../../../data/NavList.json';
import { StateContext } from '../../../store/StateProvider';

export const AsideMenu = () => {
  const { t } = useContext(LanguageContext);
  const { setOpenBurger } = useContext(StateContext);

  return (
    <aside className={style.menu} id="menu">
      <div className={style.menu__top}>
        <a href="#">
          <Logo className={style.menu__topLogo} />
        </a>
        <a
          href="#"
          className={style.menu__topLink}
          onClick={() => setOpenBurger(false)}
        >
          <LogoClose className={style.menu__icons} />
        </a>
      </div>

      <div className={style.menu__content}>
        <ul className={style.menu__contentList}>
          {data.map(item => (
            <li className={style.menu__listItem} key={item}>
              <a href="#" className={style.menu__listLink}>
                {t(`${item.toLowerCase()}`)}
              </a>
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
        <a href="#" className={style.menu__wrap}>
          <LogoFavorites className={style.menu__icons} />
        </a>
        <a href="#" className={style.menu__wrap}>
          <LogoCart className={style.menu__icons} />
        </a>
      </div>
    </aside>
  );
};
