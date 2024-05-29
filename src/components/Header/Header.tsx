import ThemeButton from './ThemeButton/ThemeButton';
import { LangButton } from './LangButton/LangButton';
import { Logo } from '../Logo/Logo';
import { LogoCart } from '../Logo/LogoCart';
import { NavList } from './NavList/NavList';
import { LogoFavorites } from '../Logo/LogoFavorites';
import style from './Header.module.scss';
import { useContext, useState } from 'react';
import { BreakPointsContext } from '../../store/BreakPointsProvider';
import { LogoBurger } from '../Logo/LogoBurger';
import { LanguageContext } from '../../store/LanguageProvider';
import { ArrowLeft } from '../Logo/ArrowLeft';
import { ArrowRight } from '../Logo/ArrowRight';
import { Slider } from './AsideMenu/Slider/Slider';
import classNames from 'classnames';

export const Header = () => {
  const { isLaptop } = useContext(BreakPointsContext);
  const { t } = useContext(LanguageContext);
  const [count, setCount] = useState(0);
  // const [direction, setDirection] = useState(false);
  // let timer: any = null;

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
              <div className={style.header__buttonWrapper}>
                <LangButton />
              </div>
              <div className={style.header__buttonWrapper}>
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
            <a href="#menu" className={style.header__actionsLink}>
              <LogoBurger className={style.header__actionsImg} />
            </a>
          )}
        </div>
      </div>
      <div className={style.header__bottom}>
        <h1 className={style.header__bottomTitle}>{t('welcome')}</h1>

        <div className={style.header__bottomSlider}>
          <button
            className={style.header__arrowButton}
            onClick={handlePrev}
            disabled={count === 0}
          >
            <ArrowLeft className={style.header__arrowIcon} />
          </button>
          <Slider count={count} />
          <div className={style.header__containerButton}>
            {[0, 1, 2].map(item => (
              <span
                key={item}
                onClick={() => setCount(item)}
                className={classNames(style.header__smallButton, {
                  [style.header__activeButton]: count === item,
                })}
              ></span>
            ))}
          </div>
          <button
            className={style.header__arrowButton}
            onClick={handleNext}
            disabled={count === 2}
          >
            <ArrowRight className={style.header__arrowIcon} />
          </button>
        </div>
      </div>
    </header>
  );
};
