import { useState } from 'react';
import styles from './ProductSlider.module.scss';

const images = [
  '/img/slider1/banner1.png',
  '/img/slider1/banner2.png',
  '/img/slider1/banner3.png',
];

export const ProductSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  const handleNext = () => {
    setDirection('next');
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 200);
  };

  const handlePrev = () => {
    setDirection('prev');
    setTimeout(() => {
      setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }, 200);
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <section className={styles.main__section}>
          <div className={styles.main__sliderContainer}>
            <h1>Welcome to Nice Gadgets store!</h1>
            <button
              className={styles.main__buttonPrev}
              onClick={handlePrev}
            ></button>

            <div className={`${styles.main__box} ${direction}`}>
              <img key={current} src={images[current]} alt="banner" />
            </div>

            <button
              className={styles.main__buttonNext}
              onClick={handleNext}
            ></button>

            <ul className={styles.main__dotsBox}>
              {images.map((_, index) => (
                <li className={styles.main__dot} key={index}>
                  <button
                    className={`${styles.main__dotButton} ${current === index ? 'active' : ''}`}
                    onClick={() => setCurrent(index)}
                  ></button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};
