/* eslint-disable max-len */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';
import { ArrowButton } from '../../../components/Arrow/ArrowButton';
import { SliderProduct } from './SliderProduct';
import { getTranslation } from '../../Base/utils/getTranslation';
import { useAppState } from '../../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export const PicturesSlider: React.FC = () => {
  const TOTAL_SLIDES = 2;
  const { language } = useAppState();
  const t = getTranslation(language);
  const navigate = useNavigate();

  const [currentPicture, setCurrentPicture] = useState(0);
  const sliderRef = useRef<HTMLUListElement>(null);

  const touchStartX = useRef(0);
  const currentTranslate = useRef(0);
  const previousTranslate = useRef(0);
  const isSwiping = useRef(false);
  const hasMoved = useRef(false);

  const handleArrowClick = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'left') {
        setCurrentPicture(prev => (prev === 0 ? TOTAL_SLIDES : prev - 1));
      } else {
        setCurrentPicture(prev => (prev === TOTAL_SLIDES ? 0 : prev + 1));
      }
    },
    [TOTAL_SLIDES],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      handleArrowClick('right');
    }, 5000);

    return () => clearInterval(interval);
  }, [handleArrowClick]);

  const handleTouchStart = (e: React.TouchEvent) => {
    isSwiping.current = true;
    hasMoved.current = false;
    touchStartX.current = e.targetTouches[0].clientX;

    previousTranslate.current =
      -currentPicture * (sliderRef.current?.offsetWidth || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) {
      return;
    }

    const deltaX = e.targetTouches[0].clientX - touchStartX.current;

    if (Math.abs(deltaX) > 10) {
      hasMoved.current = true;
    }

    currentTranslate.current = previousTranslate.current + deltaX;

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) {
      return;
    }

    isSwiping.current = false;

    const threshold = 50;
    const movedBy = currentTranslate.current - previousTranslate.current;

    if (hasMoved.current && Math.abs(movedBy) > threshold) {
      if (movedBy < 0) {
        handleArrowClick('right');
      } else {
        handleArrowClick('left');
      }
    } else {
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${previousTranslate.current}px)`;
      }
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.carousel}>
        <div className={styles.onTablet}>
          <ArrowButton
            direction="left"
            height="100%"
            onClick={() => handleArrowClick('left')}
          />
        </div>

        <div
          className={styles.products}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ul
            ref={sliderRef}
            className={styles.productsList}
            style={{ transform: `translateX(-${currentPicture * 100}%)` }}
          >
            <SliderProduct
              title={t.homePage.sliderProduct.titles[currentPicture]}
              image="./img/accessories/apple-watch-series-6/space-gray/00.webp"
              buttonContent={t.homePage.sliderProduct.buttonContent[0]}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                navigate('/accessories/apple-watch-series-6-44mm-space-gray');
              }}
            />
            <SliderProduct
              title={t.homePage.sliderProduct.titles[currentPicture]}
              buttonContent={t.homePage.sliderProduct.buttonContent[1]}
              image="./img/phones/apple-iphone-14-pro/spaceblack/00.webp"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                navigate('/phones/apple-iphone-14-pro-512gb-spaceblack');
              }}
            />
            <SliderProduct
              title={t.homePage.sliderProduct.titles[currentPicture]}
              image="./img/tablets/apple-ipad-pro-11-2021/spacegray/00.webp"
              buttonContent={t.homePage.sliderProduct.buttonContent[0]}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                navigate('/tablets/apple-ipad-pro-11-2021-512gb-spacegray');
              }}
            />
          </ul>
        </div>

        <div className={styles.onTablet}>
          <ArrowButton
            direction="right"
            height="100%"
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div className={styles.dashes}>
        <div
          onClick={() => setCurrentPicture(0)}
          className={`
            ${styles.dash}
            ${currentPicture === 0 ? styles.activeDash : ''}
          `}
        ></div>
        <div
          onClick={() => setCurrentPicture(1)}
          className={`
            ${styles.dash}
            ${currentPicture === 1 ? styles.activeDash : ''}`}
        ></div>
        <div
          onClick={() => setCurrentPicture(2)}
          className={`
            ${styles.dash}
            ${currentPicture === 2 ? styles.activeDash : ''}
          `}
        ></div>
      </div>
    </div>
  );
};
