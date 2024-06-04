import ThemeButton from './ThemeButton/ThemeButton';
import { LangButton } from './LangButton/LangButton';
import { Logo } from '../Logo/Logo';
import { LogoCart } from '../Logo/LogoCart';
import { NavList } from './NavList/NavList';
import { LogoFavorites } from '../Logo/LogoFavorites';
import style from './Header.module.scss';
import { useContext, useEffect } from 'react';
import { BreakPointsContext } from '../../store/BreakPointsProvider';
import { LogoBurger } from '../Logo/LogoBurger';
import { StateContext } from '../../store/StateProvider';
import { DeskTopBannerImages } from '../../constant';

export const Header = () => {
  const { isLaptop } = useContext(BreakPointsContext);
  const { setOpenBurger, autoPlay, setCount } = useContext(StateContext);

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        setCount(prevCount => {
          if (prevCount + 1 > DeskTopBannerImages.length - 1) {
            return 0;
          } else {
            return prevCount + 1;
          }
        });
      }, 100000);

      return () => clearInterval(intervalId);
    } else {
      return () => {};
    }
  }, [autoPlay, setCount]);

  return (
    <header className={style.header}>
      <div className={style.header__top}>
        <div className={style.header__leftNav}>
          <a href="#" className={style.header__link}>
            <Logo className={style.header__logo} />
          </a>
          {!isLaptop && <NavList />}
        </div>

        <div className={style.header__actions}>
          {!isLaptop ? (
            <>
              <div className={style.header__topBtn}>
                <LangButton />
              </div>
              <div className={style.header__topBtn}>
                <ThemeButton />
              </div>
              <a href="#" className={style.header__actionsLink}>
                <LogoFavorites className={style.header__actionsImg} />
              </a>
              <a href="#" className={style.header__actionsLink}>
                <LogoCart className={style.header__actionsImg} />
              </a>
            </>
          ) : (
            <a
              href="#menu"
              className={style.header__actionsLink}
              onClick={() => setOpenBurger(true)}
            >
              <LogoBurger className={style.header__actionsImg} />
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
