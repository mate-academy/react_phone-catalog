import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.scss';
import { useWindowWidth } from '../../hooks/WindowWidth';
import classNames from 'classnames';
import { HotPrices } from './components/HotPrices';
import { Categories } from './components/Categories';
import { NewModels } from './components/NewModels/NewModels';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const pcImages = [
  `${import.meta.env.BASE_URL}/img/banners/banner_1.svg`,
  `${import.meta.env.BASE_URL}/img/banners/banner_2.png`,
  `${import.meta.env.BASE_URL}/img/banners/banner_3.png`,
];

const phoneImages = [
  `${import.meta.env.BASE_URL}/img/banners/banner_1_phone.png`,
  `${import.meta.env.BASE_URL}/img/banners/banner_2_phone.png`,
  `${import.meta.env.BASE_URL}/img/banners/banner_3_phone.png`,
];

export const HomePage: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [visiblePage, setVisiblePage] = useState<boolean>(false);
  const windowWidth = useWindowWidth();
  const visibleImages = windowWidth < 640 ? phoneImages : pcImages;
  const lastMotion = useRef<'left' | 'right'>('right');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setIndex(0);
  }, [visibleImages]);

  const nextImage = useCallback(() => {
    lastMotion.current = 'right';
    setIndex(prev => (prev + 1) % visibleImages.length);
  }, [visibleImages.length]);

  const prevImage = useCallback(() => {
    lastMotion.current = 'left';
    setIndex(prev => (prev - 1 + visibleImages.length) % visibleImages.length);
  }, [visibleImages.length]);

  const handleSwipe = useCallback(
    (startX: number, endX: number) => {
      const diffX = endX - startX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    },
    [nextImage, prevImage],
  );

  useEffect(() => {
    let startX = 0;
    let endX = 0;

    function onTouchStart(event) {
      startX = event.touches[0].clientX;
    }

    function onTouchEnd(event) {
      endX = event.changedTouches[0].clientX;
      handleSwipe(startX, endX);
    }

    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleSwipe]);

  useEffect(() => {
    if (!visiblePage) {
      setTimeout(() => setVisiblePage(true), 100);
    }
  }, [visiblePage]);

  return (
    <>
      {visiblePage ? (
        <>
          <header id="home" className={styles.home}>
            <h1 className={styles.home__title}>{t('home_title')}</h1>

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
              <AnimatePresence mode="wait">
                <motion.img
                  onClick={() =>
                    navigate(
                      '/phones/apple-iphone-14?capacity=128GB&color=midnight',
                    )
                  }
                  key={visibleImages[index]}
                  src={visibleImages[index]}
                  alt="banner"
                  className={styles.image}
                  initial={{
                    opacity: 0,
                    x: lastMotion.current === 'right' ? 100 : -100,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: lastMotion.current === 'right' ? -100 : 100,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </AnimatePresence>
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
      ) : (
        <h1>Product Catalog</h1>
      )}
    </>
  );
};
