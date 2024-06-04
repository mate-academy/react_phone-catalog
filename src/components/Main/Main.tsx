import style from '../Main/Main.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext } from 'react';
import { BreakPointsContext } from '../../store/BreakPointsProvider';
import { StateContext } from '../../store/StateProvider';
import { ArrowLeft } from '../Logo/ArrowLeft';
import { Slider } from './Slider/Slider';
import { DeskTopBannerImages } from '../../constant';
import classNames from 'classnames';
import { ArrowRight } from '../Logo/ArrowRight';
export const Main = () => {
  const { t } = useContext(LanguageContext);
  const { isMobile } = useContext(BreakPointsContext);
  const { openBurger, count, setCount } = useContext(StateContext);

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

  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.main__content}>
          <h1 className={style.main__title}>{t('welcome')}</h1>
          <section className={style.slider}>
            {!openBurger && (
              <div className={style.main__bottom}>
                <div className={style.main__content}>
                  <div className={style.main__slider}>
                    {!isMobile && (
                      <button
                        className={style.main__sliderButton}
                        onClick={handlePrev}
                      >
                        <ArrowLeft className={style.main__arrowIcon} />
                      </button>
                    )}
                    <Slider />
                    <div className={style.main__containerSmallBtn}>
                      {DeskTopBannerImages.map((_, index) => (
                        <span
                          key={index}
                          onClick={() => handleSmallButton(index)}
                          className={classNames(style.main__smallButton, {
                            [style.main__activeButton]: count === index,
                          })}
                        ></span>
                      ))}
                    </div>
                    {!isMobile && (
                      <button
                        className={style.main__sliderButton}
                        onClick={handleNext}
                      >
                        <ArrowRight className={style.main__arrowIcon} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className={style.brandNewModels}>
            <h2>{t('newModels')}</h2>
          </section>
        </div>
      </div>
    </main>
  );
};
