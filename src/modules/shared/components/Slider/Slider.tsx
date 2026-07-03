//#region imports
import { MutableRefObject, ReactNode, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
//#endregion

type Props<T> = {
  slides: T[];
  refs: {
    sliderRef: RefObject<HTMLDivElement>;
    containerRef: RefObject<HTMLDivElement>;
    isTransitioning: MutableRefObject<boolean>;
  };
  gap: number;
  scroll: number;
  renderSlide: (slide: T) => ReactNode;
  containerClass: string;
  sliderClass?: string;
  onTransitionEnd?: () => void;
};

export const Slider = <T extends { id: string | number }>({
  slides,
  refs,
  gap,
  scroll,
  renderSlide,
  containerClass,
  sliderClass,
  onTransitionEnd,
}: Props<T>) => {
  const { t } = useTranslation('shared');
  const { sliderRef, containerRef, isTransitioning } = refs;

  return (
    <div className={sliderClass} ref={sliderRef}>
      <div
        className={containerClass}
        ref={containerRef}
        style={{
          transform: `translateX(${-scroll}px)`,
          transition: isTransitioning.current ? 'transform 0.3s' : 'none',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        <ul
          className={baseStyles.slideList}
          style={{
            gap: `${gap}px`,
          }}
          aria-label={t('productSlides')}
        >
          {slides.map((slide, i) => (
            <li key={`${i} - ${slide.id}`} className={baseStyles.slide}>
              {renderSlide(slide)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
