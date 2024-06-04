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
import { LanguageContext } from '../../store/LanguageProvider';
import { ArrowLeft } from '../Logo/ArrowLeft';
import { ArrowRight } from '../Logo/ArrowRight';
import { Slider } from './AsideMenu/Slider/Slider';
import classNames from 'classnames';
import { StateContext } from '../../store/StateProvider';
import { DeskTopBannerImages } from '../../constant';

export const Header = () => {
  const { isLaptop, isMobile } = useContext(BreakPointsContext);
  const { t } = useContext(LanguageContext);
  const { openBurger, setOpenBurger, autoPlay, count, setCount } =
    useContext(StateContext);

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
    <>
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
      <section>
        {!openBurger && (
          <div className={style.header__bottom}>
            <div className={style.header__content}>
              <h1 className={style.header__title}>{t('welcome')}</h1>

              <div className={style.header__slider}>
                {!isMobile && (
                  <button
                    className={style.header__sliderButton}
                    onClick={handlePrev}
                  >
                    <ArrowLeft className={style.header__arrowIcon} />
                  </button>
                )}
                <Slider />
                <div className={style.header__containerSmallBtn}>
                  {DeskTopBannerImages.map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleSmallButton(index)}
                      className={classNames(style.header__smallButton, {
                        [style.header__activeButton]: count === index,
                      })}
                    ></span>
                  ))}
                </div>
                {!isMobile && (
                  <button
                    className={style.header__sliderButton}
                    onClick={handleNext}
                  >
                    <ArrowRight className={style.header__arrowIcon} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
