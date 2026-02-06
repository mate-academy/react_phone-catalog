import { useEffect, useState } from 'react';
import styles from './style.module.scss';

const banners = [
  {
    desktop: `${import.meta.env.BASE_URL}img/banners/banner_nowAviable_1.png`,
    mobile: `${import.meta.env.BASE_URL}img/banners/mobileBanner_nowAviable_1.png`,
    alt: 'Banner 1',
  },
  {
    desktop: `${import.meta.env.BASE_URL}img/banners/banner_nowAviable_2.png`,
    mobile: `${import.meta.env.BASE_URL}img/banners/mobileBanner_nowAviable_2.png`,
    alt: 'Banner 2',
  },
  {
    desktop: `${import.meta.env.BASE_URL}img/banners/banner_nowAviable_3.png`,
    mobile: `${import.meta.env.BASE_URL}img/banners/mobileBanner_nowAviable_3.png`,
    alt: 'Banner 3',
  },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  const handleDashClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.slider}>
      <button
        className={styles.slider_left}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <img src={`${import.meta.env.BASE_URL}img/icons/Arrow_Left.svg`} alt="Previous" />
      </button>

      <div className={styles.slider_main}>
        <picture>
          <source
            srcSet={banners[currentIndex].desktop}
            media="(min-width: 640px)"
          />
          <img
            src={banners[currentIndex].mobile}
            alt={banners[currentIndex].alt}
            className={styles.slider_main_content}
          />
        </picture>
      </div>

      <button
        onClick={handleNext}
        aria-label="Next slide"
        className={styles.slider_right}
      >
        <img src={`${import.meta.env.BASE_URL}img/icons/Arrow_Right.svg`} alt="Next" />
      </button>
      <div className={styles.slider_menu}>
        {banners.map((_, index) => (
          <div key={index} className={styles.slider_menu_item}>
            <span
              className={`${styles.slider_menu_item_dash} ${currentIndex === index ? styles.is_active : ''}`}
              onClick={() => handleDashClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`Go to slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;