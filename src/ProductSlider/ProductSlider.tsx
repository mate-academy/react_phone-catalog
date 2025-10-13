import { useEffect, useState } from 'react';
import styles from './ProductSlider.module.scss';

const images = [
  '/img/slider1/Banner.png',
  '/img/slider1/banner2.png',
  '/img/slider1/banner3.png',
];

export const ProductSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isAuto, setIsAuto] = useState(true);

  const handleNext = () => {
    setIsAuto(false);
    setDirection('next');
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsAuto(false);
    setDirection('prev');
    setTimeout(() => {
      setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }, 200);
  };

  useEffect(() => {
    if (!isAuto) {
      return;
    }

    const interval = setInterval(() => {
      setDirection('next');
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuto]);

  return (
    <section className={styles.container}>
      <div className={styles.container__sliderContainer}>
        <h1>Welcome to Nice Gadgets store!</h1>
        <button
          className={styles.container__buttonPrev}
          onClick={handlePrev}
        ></button>

        <div className={`${styles.container__box} ${direction}`}>
          <img key={current} src={images[current]} alt="banner" />
        </div>

        <button
          className={styles.container__buttonNext}
          onClick={handleNext}
        ></button>

        <ul className={styles.container__dotsBox}>
          {images.map((_, index) => (
            <li className={styles.container__dot} key={index}>
              <button
                className={`${styles.container__dotButton} ${current === index ? styles.active : ''}`}
                onClick={() => setCurrent(index)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
