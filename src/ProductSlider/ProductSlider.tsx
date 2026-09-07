import { useEffect, useState } from 'react';
import styles from './ProductSlider.module.scss';

const images = [
  '/img/slider1/banner1.png',
  '/img/slider1/banner2.png',
  '/img/slider1/banner3.png',
];

export const ProductSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % images.length);
    setIsAuto(false);
  };

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
    setIsAuto(false);
  };

  useEffect(() => {
    if (!isAuto) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuto]);

  return (
    <section className={styles.container}>
      <div className={styles.container__sliderContainer}>
        <h1>Welcome to Nice Gadgets store!</h1>

        <button className={styles.container__buttonPrev} onClick={handlePrev}>
          <span className={styles.container__arrow}>{'<'}</span>
        </button>

        <div className={styles.container__listWrapper}>
          <div
            className={styles.container__list}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className={styles.container__item}>
                <img src={img} alt={`banner ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <button className={styles.container__buttonNext} onClick={handleNext}>
          <span className={styles.container__arrow}>{'>'}</span>
        </button>

        <ul className={styles.container__dotsBox}>
          {images.map((_, index) => (
            <li className={styles.container__dot} key={index}>
              <button
                className={`${styles.container__dotButton} ${
                  current === index ? styles.active : ''
                }`}
                onClick={() => setCurrent(index)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
