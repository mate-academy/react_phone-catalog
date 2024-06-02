import ThemeButton from './ThemeButton/ThemeButton';
import { LangButton } from './LangButton/LangButton';
import { Logo } from '../Logo/Logo';
import { LogoCart } from '../Logo/LogoCart';
import { NavList } from './NavList/NavList';
import { LogoFavorites } from '../Logo/LogoFavorites';
import style from './Header.module.scss';
import { useContext, useEffect, useState } from 'react';
import { BreakPointsContext } from '../../store/BreakPointsProvider';
import { LogoBurger } from '../Logo/LogoBurger';
import { LanguageContext } from '../../store/LanguageProvider';
import { ArrowLeft } from '../Logo/ArrowLeft';
import { ArrowRight } from '../Logo/ArrowRight';
import { Slider } from './AsideMenu/Slider/Slider';
import classNames from 'classnames';
import { StateContext } from '../../store/StateProvider';

export const Header = () => {
  const { isLaptop, isMobile } = useContext(BreakPointsContext);
  const { t } = useContext(LanguageContext);
  const [count, setCount] = useState(0);
  const { openBurger, setOpenBurger, autoPlay } = useContext(StateContext);

  function handleNext() {
    if (count < 2) {
      setCount(prevCount => prevCount + 1);
    }
  }

  function handlePrev() {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  }

  function handleSmallButton(item: number) {
    setCount(item);
  }

  useEffect(() => {
    if (!autoPlay) {
      const intervalId = setInterval(() => {
        setCount(prevCount => {
          if (prevCount + 1 > 2) {
            return 0;
          } else {
            return prevCount + 1;
          }
        });
      }, 3000);

      return () => clearInterval(intervalId);
    } else {
      return () => {};
    }
  }, [autoPlay]);

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
      {!openBurger && (
        <div className={style.header__bottom}>
          <div className={style.header__content}>
            <h1 className={style.header__title}>{t('welcome')}</h1>

            <div className={style.header__slider}>
              {!isMobile && (
                <button
                  className={style.header__sliderButton}
                  onClick={handlePrev}
                  disabled={count === 0}
                  onTouchEnd={handlePrev}
                >
                  <ArrowLeft className={style.header__arrowIcon} />
                </button>
              )}
              <Slider count={count} />
              <div className={style.header__containerSmallBtn}>
                {[0, 1, 2].map(item => (
                  <span
                    key={item}
                    onClick={() => handleSmallButton(item)}
                    className={classNames(style.header__smallButton, {
                      [style.header__activeButton]: count === item,
                    })}
                  ></span>
                ))}
              </div>
              {!isMobile && (
                <button
                  className={style.header__sliderButton}
                  onClick={handleNext}
                  disabled={count === 2}
                  onTouchStart={handleNext}
                >
                  <ArrowRight className={style.header__arrowIcon} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
