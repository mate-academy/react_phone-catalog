import React, { useEffect, useState } from 'react';
import styles from './BannerSlider.module.scss';

const images = [
  '/img/banner-phones.png',
  '/img/banner-accessories.png',
  '/img/banner-tablets.png',
];

export const BannerSlider = () => {
  const [index, setIndex] = useState(0);

  const handleButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <main className={styles.main}>
      <div className={styles.toNiceGadgets}>
        <h1 className={styles.toNiceGadgetsH1}>
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <div className={styles.slider}>
        <img src={images[index]} alt="banner" className={styles.sliderImg} />

        <button className={styles.sliderButton} onClick={handleButton}>
          {'<'}
        </button>
        {images.map((_, i) => (
          <button
            key={i}
            className={i === index ? styles.active : ''}
            onClick={() => setIndex(i)}
          />
        ))}
        <button className={styles.sliderButton} onClick={handleButton}>
          {'>'}
        </button>
        <div className={styles.dashes}></div>
      </div>
    </main>
  );
};
