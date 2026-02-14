import { useBannerSliderLogic } from '../useBannerSliderLogic';
import styles from './BannerSliderTablet.module.scss';

const images = [
  './img/swiper/desktop-banner-1.png',
  './img/swiper/desktop-banner-2.png',
  './img/swiper/desktop-banner-3.png',
];

export const BannerSliderTablet = () => {
  const { sliderRef, activeIndex, scrollToIndex } = useBannerSliderLogic(
    images.length,
  );

  return (
    <div className={styles['banner-slider']}>
      <div className={styles['banner-slider__grid']}>
        <button
          className={styles['banner-slider__nav-button']}
          onClick={() => scrollToIndex(activeIndex - 1)}
        >
          <img src="./img/Icons/arrow-left.svg" />
        </button>

        <div className={styles['banner-slider__slides']} ref={sliderRef}>
          {images.map((src, i) => (
            <div key={i} className={styles['banner-slider__slide']}>
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className={styles['banner-slider__image']}
              />
            </div>
          ))}
        </div>

        <button
          className={styles['banner-slider__nav-button']}
          onClick={() => scrollToIndex(activeIndex + 1)}
        >
          <img src="./img/Icons/arrow-right.svg" />
        </button>
      </div>

      <div className={styles['banner-slider__dots']}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles['banner-slider__dot']} ${
              i === activeIndex ? styles['banner-slider__dot--active'] : ''
            }`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
