/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useCallback, useContext, useEffect } from 'react';

import { MainContext } from '../../../../../../context/MainContext';
import { LeftArrow } from './components/Arrows/LeftArrow';
import { RightArrow } from './components/Arrows/RightArrow';
import { Order } from './components/Order';
import { Swiper } from './components/Swiper';
import styles from './Slider.module.scss';

export const Slider: React.FC = React.memo(() => {
  const { isMobile, imgIndex, mobImgs, imgs, setImgIndex } =
    useContext(MainContext);

  // #region functions

  const swipeHandler = useCallback(({ deltaX }: { deltaX: number }) => {
    if (deltaX > 0) {
      setImgIndex(index => {
        if (index === 0) {
          return mobImgs.length - 1;
        }

        return index - 1;
      });
    } else {
      setImgIndex(index => {
        if (index === mobImgs.length - 1) {
          return 0;
        }

        return index + 1;
      });
    }
  }, []);

  const rightArrowHandler = useCallback(() => {
    setImgIndex(index => {
      if (index === imgs.length - 1) {
        return 0;
      }

      return index + 1;
    });
  }, []);

  const intervalFunction = () => {
    return setInterval(rightArrowHandler, 5000);
  };

  // #endregion
  // #region markups

  const mobileSliderMarkup = (
    <Swiper onSwipe={swipeHandler}>
      <div className={styles.slider}>
        {mobImgs.map(url => {
          return (
            <img
              key={url}
              className={styles.img}
              style={{ transform: `translate(${-100 * imgIndex}%)` }}
              src={url}
            />
          );
        })}
      </div>
    </Swiper>
  );

  const sliderMarkup = (
    <div className={classNames('flex-center', styles['slider-container'])}>
      <LeftArrow />
      <div className={styles.slider}>
        <Order imgIndex={imgIndex} />
        {imgs.map(url => {
          return (
            <React.Fragment key={url}>
              <img
                className={styles.img}
                style={{ transform: `translate(${-100 * imgIndex}%)` }}
                src={url}
              />
            </React.Fragment>
          );
        })}
      </div>
      <RightArrow rightArrowHandler={rightArrowHandler} />
    </div>
  );

  // #endregion
  // #region useEffects

  useEffect(() => {
    const intervalId = intervalFunction();

    return () => clearInterval(intervalId);
  }, []);

  // #endregion

  return <>{isMobile ? mobileSliderMarkup : sliderMarkup}</>;
});

Slider.displayName = 'Slider';
