//#region imports
import { SliderButton } from '../../../shared/components/SliderButton';
import { SliderDashes } from './components/SliderDashes';
import { Slider } from '../../../shared/components/Slider';
import { Slide } from './components/Slide';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { useSlider } from '../../../shared/hooks/useSlider';
import { useSwipe } from '../../../shared/hooks/useSwipe';
import { extendedProducts } from './constants/bannerData';
import baseStyles from './base.module.scss';
import styles from './BannerSlider.module.scss';
//#endregion

export const BannerSlider = () => {
  const { t } = useTranslation('homePage');
  const sliderGap = 0;

  const { refs, currentScroll, step, controls, onTransitionEnd } = useSlider(
    sliderGap,
    extendedProducts.length,
    1,
    true,
  );
  const { goNext, goPrev, goToSlide } = controls;

  const handleSwipe = useCallback(
    (start: number, end: number) => {
      if (start > end) {
        goNext();
      } else {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  useSwipe(handleSwipe, refs.containerRef);

  useEffect(() => {
    const timerId = setTimeout(() => {
      goNext();
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [goNext, step]);

  return (
    <div
      className={baseStyles.bannerSlider}
      role="region"
      aria-label={t('banner')}
    >
      <div className={baseStyles.banner}>
        <div className={baseStyles.button}>
          <SliderButton
            direction="left"
            size="oval"
            onClick={goPrev}
            ariaLabel={t('previousSlide')}
          />
        </div>

        <Slider
          slides={extendedProducts}
          refs={refs}
          gap={sliderGap}
          scroll={currentScroll}
          renderSlide={slide => <Slide slide={slide} />}
          containerClass={baseStyles.currentSlide}
          sliderClass={styles.container}
          onTransitionEnd={onTransitionEnd}
        />

        <div className={baseStyles.button}>
          <SliderButton
            direction="right"
            size="oval"
            onClick={goNext}
            ariaLabel={t('nextSlide')}
          />
        </div>
      </div>

      <SliderDashes
        count={extendedProducts.length}
        onClick={goToSlide}
        currentStep={step}
      />
    </div>
  );
};
