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
  const [currentIndex, setCurrentIndex] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleDashClick = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(banners.length);
      }, 500);
    } else if (currentIndex === banners.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }
  }, [currentIndex]);

  const getRealIndex = () => {
    if (currentIndex === 0) return banners.length - 1;
    if (currentIndex === banners.length + 1) return 0;
    return currentIndex - 1;
  };

  return (
    <section className={styles.slider}>
      <button
        className={styles.slider_left}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/Arrow_Left.svg`}
          alt="Previous"
        />
      </button>

      <div className={styles.slider_main}>
        <div 
          className={styles.slider_track}
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
          }}
        >
          <picture className={styles.slider_slide}>
            <source
              srcSet={banners[banners.length - 1].desktop}
              media="(min-width: 640px)"
            />
            <img
              src={banners[banners.length - 1].mobile}
              alt={banners[banners.length - 1].alt}
              className={styles.slider_image}
            />
          </picture>

          {banners.map((banner, index) => (
            <picture key={index} className={styles.slider_slide}>
              <source
                srcSet={banner.desktop}
                media="(min-width: 640px)"
              />
              <img
                src={banner.mobile}
                alt={banner.alt}
                className={styles.slider_image}
              />
            </picture>
          ))}

          <picture className={styles.slider_slide}>
            <source
              srcSet={banners[0].desktop}
              media="(min-width: 640px)"
            />
            <img
              src={banners[0].mobile}
              alt={banners[0].alt}
              className={styles.slider_image}
            />
          </picture>
        </div>
      </div>

      <button
        onClick={handleNext}
        aria-label="Next slide"
        className={styles.slider_right}
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/Arrow_Right.svg`}
          alt="Next"
        />
      </button>
      <div className={styles.slider_menu}>
        {banners.map((_, index) => (
          <div key={index} className={styles.slider_menu_item}>
            <span
              className={`${styles.slider_menu_item_dash} ${getRealIndex() === index ? styles.is_active : ''}`}
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