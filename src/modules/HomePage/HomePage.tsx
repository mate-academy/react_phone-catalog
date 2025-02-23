import React, { useCallback, useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import clsx from 'clsx';
import { useWindowWidth } from '../../hooks/WindowWidth';
import classNames from 'classnames';
import { HotPrices } from './components/HotPrices';
import { Categories } from './components/Categories';
import { NewModels } from './components/NewModels/NewModels';

const pcImages = [
  '/img/banners/banner_1.svg',
  '/img/banners/banner_2.png',
  '/img/banners/banner_3.png',
];

const phoneImages = [
  '/img/banners/banner_1_phone.svg',
  '/img/banners/banner_2_phone.png',
  '/img/banners/banner_3_phone.png',
];

export const HomePage: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const windowWidth = useWindowWidth();
  const [error, setError] = useState<string | null>(null);
  const visibleImages = windowWidth < 640 ? phoneImages : pcImages;

  useEffect(() => {
    setIndex(0);
  }, [visibleImages]);

  const nextImage = useCallback(() => {
    setIndex(prev => (prev + 1) % visibleImages.length);
  }, [visibleImages.length]);

  const prevImage = useCallback(() => {
    setIndex(prev => (prev - 1 + visibleImages.length) % visibleImages.length);
  }, [visibleImages.length]);

  useEffect(() => {
    if (error) {
      return;
    }
  }, [error]);

  return (
    <>
      <header id="home" className={styles.home}>
        <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>

        {windowWidth > 640 && (
          <>
            <button
              className={classNames(styles.slideButton, styles.buttonLeft)}
              onClick={prevImage}
            >
              {'<'}
            </button>
            <button
              className={classNames(styles.slideButton, styles.buttonRight)}
              onClick={nextImage}
            >
              {'>'}
            </button>
          </>
        )}

        <div className={styles.wrapper}>
          {visibleImages.map((img, i) => (
            <img
              key={img}
              src={img}
              alt="banner"
              className={clsx(styles.image, { [styles.active]: i === index })}
            />
          ))}
        </div>

        <div className={styles.dots}>
          {visibleImages.map((image, ImageIndex) => {
            return (
              <div
                key={image}
                onClick={() => setIndex(ImageIndex)}
                className={classNames(styles.dots__dot, {
                  [styles.dotActive]: index === ImageIndex,
                })}
              ></div>
            );
          })}
        </div>
      </header>

      <NewModels />

      <Categories />

      <HotPrices />
    </>
  );
};
