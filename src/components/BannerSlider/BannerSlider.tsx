import { BannerSkeleton } from '../Loaders/BannerSkeleton';
import styles from './BannerSlider.module.scss';

import { useEffect, useState } from 'react';

type BannerSlideProps = {
  isLoading: boolean;
};

export const BannerSlider = ({ isLoading }: BannerSlideProps) => {
  const banners: string[] = [
    './img/phones/apple-iphone-14-pro/spaceblack/04.webp',
    './img/tablets/apple-ipad-pro-11-2021/spacegray/01.webp',
    './img/accessories/apple-watch-series-6/silver/00.webp',
  ];

  const [currentBanner, setCurrentBanner] = useState<number>(0);

  // logica do slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentBanner === 2) {
        setCurrentBanner(0);
      } else {
        setCurrentBanner(currentBanner + 1);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentBanner]);

  return (
    <div className={styles.container}>
      {/*  */}
      {/* barra lateral esquerda */}
      <a
        className={`${styles.container__bar} ${styles.container__leftBar}`}
        onClick={() => {
          if (currentBanner > 0) {
            setCurrentBanner(currentBanner - 1);
          }
        }}
      >
        <img alt="Previus" src="./icons/ChevronArrowLeft.svg" />
      </a>

      <div className={styles.container__slider}>
        {isLoading ? (
          <BannerSkeleton />
        ) : (
          <div className={styles.container__slider__content}>
            <div className={styles.container__slider__content__info}>
              {currentBanner === 0 && (
                <>
                  <p>Now available</p>
                  <p>in our store!</p>
                  <p>Iphone 14 Pro</p>
                  <p>Buy now!</p>
                </>
              )}
              {currentBanner === 1 && (
                <>
                  <p>Now available</p>
                  <p>in our store!</p>
                  <p>Apple Ipad Pro 11</p>
                  <p>Buy now!</p>
                </>
              )}
              {currentBanner === 2 && (
                <>
                  <p>Now available</p>
                  <p>in our store!</p>
                  <p>Apple Watch Series 6</p>
                  <p>Buy now!</p>
                </>
              )}
            </div>

            <div className={styles.container__slider__content__image}>
              <img src={banners[currentBanner]} alt="Banner Image" />
            </div>
          </div>
        )}
        {isLoading ? (
          <></>
        ) : (
          <div className={styles.container__slider__bars}>
            <a
              className={`
    ${styles.container__slider__bars}
    ${currentBanner === 0 ? styles.container__slider__bars__active : ''}`}
              onClick={() => {
                setCurrentBanner(0);
              }}
            ></a>
            <a
              className={`
    ${styles.container__slider__bars}
    ${currentBanner === 1 ? styles.container__slider__bars__active : ''}`}
              onClick={() => {
                setCurrentBanner(1);
              }}
            ></a>
            <a
              className={`
    ${styles.container__slider__bars}
    ${currentBanner === 2 ? styles.container__slider__bars__active : ''}`}
              onClick={() => {
                setCurrentBanner(2);
              }}
            ></a>
          </div>
        )}
      </div>
      {/*  */}
      {/* barra lateral direita */}
      <a
        className={`${styles.container__bar} ${styles.container__rightBar}`}
        onClick={() => {
          if (currentBanner < 2) {
            setCurrentBanner(currentBanner + 1);
          }
        }}
      >
        <img alt="Next" src="./icons/ChevronArrowRight.svg" />
      </a>
    </div>
  );
};
