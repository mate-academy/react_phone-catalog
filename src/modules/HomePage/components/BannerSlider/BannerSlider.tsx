import { useState, useEffect } from 'react';
import { getImg } from '../../../../utils/getImageUrl';
import styles from './BannerSlider.module.scss';

const banners = [
  {
    id: 1,
    src: getImg('/img/banner-phones.png'),
    mobileSrc: getImg('/img/banner-phones-mobile.png'),
    alt: 'Phones banner',
  },
  { id: 2, src: getImg('/img/banner-tablets.png'), alt: 'Tablets banner' },
  {
    id: 3,
    src: getImg('/img/banner-accessories.png'),
    alt: 'Accessories banner',
  },
];

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Banner auto chnange each 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.slider}>
      {/* hide button-left for mobile */}
      <div className={styles.wrapper}>
        <button
          className={styles.btn}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <img src={getImg('/img/icons/arrow-left.svg')} alt="Previous" />
        </button>

        {/* images */}
        <div className={styles.track}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`${styles.slide} ${index === currentIndex ? styles.slideActive : ''}`}
            >
              <picture>
                {banner.mobileSrc && (
                  <source
                    media="(max-width: 639px)"
                    srcSet={banner.mobileSrc}
                  />
                )}

                <img
                  src={banner.src}
                  alt={banner.alt}
                  className={styles.image}
                />
              </picture>
            </div>
          ))}
        </div>

        {/*  hide button-right for mobile */}
        <button
          className={styles.btn}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <img src={getImg('/img/icons/arrow-right.svg')} alt="Next" />
        </button>
      </div>

      {/* dots-under */}
      <div className={styles.dots}>
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
