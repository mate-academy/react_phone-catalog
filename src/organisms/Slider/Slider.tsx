import styles from './Slider.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';
import Button from '@/atoms/Button';
import { useState } from 'react';

const Slider = () => {
  const b = [
    '/img/banners/banner_0.jpg',
    '/img/banners/banner_1.jpg',
    '/img/banners/banner_2.jpg',
  ];

  const [slide, setSlide] = useState(0);

  const next = () => setSlide(prev => (prev + 1) % b.length);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const prev = () => setSlide(prev => (prev - 1 + b.length) % b.length);

  return (
    <div className={styles.slider}>
      <Button classNames={styles.button__left} onClick={prev}>
        <Chevron />
      </Button>

      <div className={styles.slider__insider}>
        <div className={styles.slider__container}>
          <div className={styles.modal}></div>
        </div>
        <img
          key={slide}
          src={b[slide]}
          width="600"
          height="300"
          decoding="async"
          draggable="false"
        />
      </div>

      <Button classNames={styles.button__right} onClick={next}>
        <Chevron />
      </Button>

      <div className={styles.pagination}>
        {b.map((_, index) => (
          <div
            key={index}
            className={styles.pagination__block}
            onClick={() => setSlide(index)}
          >
            <div
              className={`${styles.pagination__anchor}
            ${slide === index ? styles['pagination__anchor--active'] : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
