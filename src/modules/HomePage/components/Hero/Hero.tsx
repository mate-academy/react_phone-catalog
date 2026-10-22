import styles from './Hero.module.scss';
import { useSlider } from '../../../../hooks/useBanner';

const images = [
  './img/banners/banner-phones.jpg',
  './img/banners/ipads-banner-1.avif',
  './img/banners/banner-accessor.png',
];

export const Hero = () => {
  const { index, next, prev, goTo } = useSlider(images.length, 5000);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.slider}>
          {/* LEFT ARROW */}
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={prev}
            aria-label="Previous slide"
          >
            <span className={styles.arrowIcon}>
              <img src="./img/icons/ArrowLeft.svg" alt="" />
            </span>
          </button>

          {/* BANNER IMAGE */}
          <img
            src={images[index]}
            alt={`Banner ${index + 1}`}
            className={styles.bannerImage}
          />

          {/* RIGHT ARROW */}
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={next}
            aria-label="Next slide"
          >
            <span className={styles.arrowIcon}>
              <img src="./img/icons/ArrowRight.svg" alt="" />
            </span>
          </button>
        </div>
      </section>

      {/* DOTS */}
      <div className={styles.dotsWrapper}>
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={i === index ? styles.active : undefined}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
