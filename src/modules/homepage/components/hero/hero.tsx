/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import styles from './hero.module.scss';
import { ProductsList } from '../../../shared/components/productList/ProductsList';
import { SkipButton } from '../../../shared/skip/skip';
import { Shop } from '../shop/shop';
import classNames from 'classnames';
/* eslint-enable max-len */

export const HeroPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const sliderRef = useRef<HTMLUListElement>(null);

  const handleSkip = () => setCurrentIndex(currentIndex + 1);

  const handleSkipBack = () => setCurrentIndex(currentIndex - 1);

  const handleSkipSlider = () => {
    setSliderIndex(prev => (prev < 2 ? prev + 1 : 0));
  };

  const handleSkipSliderBack = () => {
    setSliderIndex(prev => (prev > 0 ? prev - 1 : 2));
  };

  const handleSkipBar = (index: number) => {
    setSliderIndex(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidt = sliderRef.current.children[0]?.clientWidth || 0;
      const offSet = sliderIndex * (sliderWidt + 16);

      sliderRef.current.style.transform = `translateX(-${offSet}px)`;
    }
  }, [sliderIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex(prevIndex => (prevIndex < 2 ? prevIndex + 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.hero__paragraph}>
          <h1 className={styles.hero__title}>Product Catalog</h1>
        </div>
        <div className={styles.hero__banner}>
          <button
            className={styles.hero__button}
            onClick={handleSkipSliderBack}
          >
            {' '}
            <img
              src="img/arrow.png"
              className={styles['hero__image--arrow-left']}
              alt=""
            />{' '}
          </button>
          <div className={styles['hero__slider-wrapper']}>
            <ul className={styles['hero__slider-list']} ref={sliderRef}>
              <li className={styles['hero__slider-item']}>
                <span className={styles['hero__image-1']} />
              </li>
              <li className={styles['hero__slider-item']}>
                <span className={styles['hero__image-2']} />
              </li>
              <li className={styles['hero__slider-item']}>
                <span className={styles['hero__image-3']} />
              </li>
            </ul>
          </div>
          <button
            className={`${styles.hero__button} ${styles['hero__button--grid-align']}`}
            onClick={handleSkipSlider}
          >
            {' '}
            <img src="img/arrow.png" alt="" />{' '}
          </button>
        </div>
        <div className={styles['hero__skip-wrapper']}>
          <div className={styles['hero__skip-container-bar']}>
            <button
              onClick={() => handleSkipBar(0)}
              className={classNames(styles['hero__skip-image'], {
                [styles['hero__skip-image--active']]: sliderIndex === 0,
              })}
            ></button>
            <button
              onClick={() => handleSkipBar(1)}
              className={classNames(styles['hero__skip-image'], {
                [styles['hero__skip-image--active']]: sliderIndex === 1,
              })}
            ></button>
            <button
              onClick={() => handleSkipBar(2)}
              className={classNames(styles['hero__skip-image'], {
                [styles['hero__skip-image--active']]: sliderIndex === 2,
              })}
            ></button>
          </div>
        </div>
      </section>
      <div className={styles['hero__product-header']}>
        <h2 className={styles['hero__product-title']}>Brand new models</h2>
        <div className={styles['hero__product-controls']}>
          <SkipButton
            handleSkip={handleSkip}
            handleSkipBack={handleSkipBack}
            currentIndex={currentIndex}
          />
        </div>
      </div>
      <div className={styles['hero__product-container']}>
        <ProductsList currentIndex={currentIndex} />
      </div>
      <Shop />
    </>
  );
};
