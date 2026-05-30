import { useBannerSliderLogic } from '../useBannerSliderLogic';
import styles from './BannerSliderMobile.module.scss';

const images = [
  './img/swiper/mini-1.png',
  './img/swiper/mini-2.png',
  './img/swiper/mini-3.png',
];

export const BannerSliderMobile = () => {
  const { sliderRef, activeIndex, scrollToIndex } = useBannerSliderLogic(
    images.length,
  );

  return (
    <div className={styles.slider}>
      <div className={styles.slides} ref={sliderRef}>
        {images.map((src, i) => (
          <div key={i} className={styles.slide}>
            <img src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.active : ''}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
