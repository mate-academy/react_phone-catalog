/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import styles from './PicturesSlider.module.scss';
import { BASE_URL } from '../../constants/baseUrl';

const banners = [
  {
    image: `${BASE_URL}img/banners/banner.png`,
    alt: 'Nice Gadgets',
  },
  {
    image: `${BASE_URL}img/banner-phones.png`,
    alt: 'Phones',
  },
  {
    image: `${BASE_URL}img/banner-tablets.png`,
    alt: 'Tablets',
  },
  {
    image: `${BASE_URL}img/banner-accessories.png`,
    alt: 'Accessories',
  },
];

export const PicturesSlider = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextSlide = () => {
    setCurrentBanner(current =>
      current === banners.length - 1 ? 0 : current + 1,
    );
  };

  const prevSlide = () => {
    setCurrentBanner(current =>
      current === 0 ? banners.length - 1 : current - 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.slider}>
      <button type="button" className={styles.arrow} onClick={prevSlide}>
        <img src={`${BASE_URL}img/icons/arrow-left.png`} alt="Previous" />
      </button>

      <div className={styles.banner}>
        <img
          src={banners[currentBanner].image}
          alt={banners[currentBanner].alt}
        />
      </div>

      <button type="button" className={styles.arrow} onClick={nextSlide}>
        <img src={`${BASE_URL}img/icons/arrow-right.png`} alt="Next" />
      </button>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={
              index === currentBanner
                ? `${styles.dot} ${styles.active}`
                : styles.dot
            }
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </section>
  );
};
