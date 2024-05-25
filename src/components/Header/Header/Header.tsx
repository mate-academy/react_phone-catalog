import ThemeButton from '../ThemeButton/ThemeButton';
import { LangButton } from '../LangButton/LangButton';
import { Logo } from '../Logo/Logo';
import { LogoCart } from '../Logo/LogoCart';
import { LogoLink } from '../Logo/LogoLink';
import { NavList } from '../NavList/NavList';
import { LogoFavorites } from '../Logo/LogoFavorites';
import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header__content}>
        <div className={style.header__top}>
          <div className={`${style['left-nav']}`}>
            <Logo className={`${style['left-nav__logo']}`} />
            <NavList />
          </div>
          <div className={`${style['right-nav']}`}>
            <LangButton />
            <ThemeButton />

            <LogoLink className={`${style['right-nav__link']}`}>
              <LogoFavorites className={`${style['right-nav__img']}`} />
            </LogoLink>
            <LogoLink className={`${style['right-nav__link']}`}>
              <LogoCart className={`${style['right-nav__img']}`} />
            </LogoLink>
          </div>
        </div>
      </div>
    </header>
  );
};
