import { useEffect, useState } from 'react';
import styles from './BannerSlider.module.css';

const images = [
  '/img/banner-phones.png',
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
];

export const BannerSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className={styles.toNiceGadgets}>
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <div className={styles.slider}>
        <img src={images[index]} alt="banner" />
        <button
          onClick={() => setIndex((index - 1 + images.length) % images.length)}
        >
          ←
        </button>
        <button onClick={() => setIndex((index + 1) % images.length)}>→</button>
        <div className={styles.dashes}>
          {images.map((_, i) => (
            <button
              key={i}
              className={i === index ? styles.active : ''}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
