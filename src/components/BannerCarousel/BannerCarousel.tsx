import { useState } from 'react';
import styles from './BannerCarousel.module.scss';

const banners = [
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

export const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex(curr => (curr === 0 ? banners.length - 1 : curr - 1));
  };

  const next = () => {
    setIndex(curr => (curr === banners.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className={styles.carousel}>
      <button data-cy="carousel-prev" onClick={prev}>
        ‹
      </button>

      <img
        src={banners[index]}
        alt="carousel banner"
        className={styles.carousel__img}
      />

      <button data-cy="carousel-next" onClick={next}>
        ›
      </button>
    </div>
  );
};

export default BannerCarousel;
