import ThemeButton from './ThemeButton/ThemeButton';
import { LangButton } from './LangButton/LangButton';
import { Logo } from '../Icons/Logo';
import { LogoCart } from '../Icons/IconCart';
import { NavList } from './NavList/NavList';
import { IconFavorites } from '../Icons/IconFavorites';
import style from './Header.module.scss';
import { useContext } from 'react';
import { BreakPointsContext } from '../../store/BreakPointsProvider';
import { LogoBurger } from '../Icons/IconBurger';
import { Link } from 'react-router-dom';
import { StateContext } from '../../store/StateProvider';

export const Header = () => {
  const { isLaptop } = useContext(BreakPointsContext);
  const { setActiveMenu } = useContext(StateContext);

  return (
    <header className={style.header}>
      <nav className={style.header__top}>
        <div className={style.header__leftNav}>
          <Link to="../" className={style.header__link}>
            <Logo className={style.header__logo} />
          </Link>
          {!isLaptop && <NavList />}
        </div>

        <ul className={style.header__actions}>
          {!isLaptop ? (
            <>
              <div className={style.header__topBtn}>
                <LangButton />
              </div>
              <div className={style.header__topBtn}>
                <ThemeButton />
              </div>
              <Link to="#" className={style.header__actionsLink}>
                <IconFavorites className={style.header__actionsImg} />
              </Link>
              <Link to="#" className={style.header__actionsLink}>
                <LogoCart className={style.header__actionsImg} />
              </Link>
            </>
          ) : (
            <button
              className={style.header__burgerMenu}
              onClick={() => setActiveMenu(true)}
            >
              <LogoBurger className={style.header__burgerMenuImg} />
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};
