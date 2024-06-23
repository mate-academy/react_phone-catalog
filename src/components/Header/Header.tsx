import ThemeButton from './ThemeButton/ThemeButton';
import { LangButton } from './LangButton/LangButton';
import { Logo } from '../Logos/Logo';
import { LogoCart } from '../Logos/LogoCart';
import { NavList } from './NavList/NavList';
import { LogoFavorites } from '../Logos/LogoFavorites';
import style from './Header.module.scss';
import { useContext } from 'react';
import { BreakPointsContext } from '../../store/BreakPointsProvider';
import { LogoBurger } from '../Logos/LogoBurger';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { isLaptop } = useContext(BreakPointsContext);
  const location = useLocation();
  console.log(location.pathname)

  return (
    <header className={style.header}>
      <nav className={style.header__top}>
        <div className={style.header__leftNav}>
          <Link to="#" className={style.header__link}>
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
                <LogoFavorites className={style.header__actionsImg} />
              </Link>
              <Link to="#" className={style.header__actionsLink}>
                <LogoCart className={style.header__actionsImg} />
              </Link>
            </>
          ) : (
            <Link
              to={location.pathname === '/menu' ? '../' : '/menu'}
              className={style.header__actionsLink}
            >
              <LogoBurger className={style.header__actionsImg} />
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};
