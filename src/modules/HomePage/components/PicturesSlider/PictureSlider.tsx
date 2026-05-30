import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PictureSlider.module.scss';
import classNames from 'classnames';
import { arrayOfImage } from './constants/imagesSlider';
import { getAssetUrl } from '../../../../api/utilis';

export const PictureSlider = () => {
  const [activeImg, setActiveImg] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(false);

  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCurrentTimeout = useCallback(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  }, []);

  const changeImageWithFade = useCallback(
    (newIndex: number) => {
      setFade(true);
      clearCurrentTimeout();

      timeOutRef.current = setTimeout(() => {
        setActiveImg(newIndex);
        setFade(false);
      }, 500);
    },
    [clearCurrentTimeout],
  );

  const nextImg = useCallback(() => {
    const newIndex = activeImg >= arrayOfImage.length - 1 ? 0 : activeImg + 1;

    changeImageWithFade(newIndex);
  }, [activeImg, changeImageWithFade]);

  useEffect(() => {
    clearCurrentTimeout();

    timeOutRef.current = setTimeout(() => {
      nextImg();
    }, 5000);

    return () => clearCurrentTimeout();
  }, [activeImg, nextImg, clearCurrentTimeout]);

  const handleImg = (index: number) => {
    if (index !== activeImg) {
      changeImageWithFade(index);
    }
  };

  const previousImg = () => {
    const newIndex = activeImg > 0 ? activeImg - 1 : arrayOfImage.length - 1;

    changeImageWithFade(newIndex);
  };

  return (
    <section>
      <div className={classNames(styles.slider, styles['slider--margin'])}>
        <div className={styles.container}>
          <button onClick={previousImg} className={styles.slider__arrow}>
            <img
              className={styles.arrow}
              src={getAssetUrl('icons/arrow_black_right.svg')}
              alt=""
            />
          </button>

          <div className={styles.pictureSlider}>
            <div className={styles.sliderLeft}>
              <h2 className={styles.sliderLeft__title}>
                Now available in our store!
                <img
                  src={getAssetUrl('icons/logo_ok_hand.svg')}
                  className={styles.sliderLeft__emoji}
                />
              </h2>
              <p className={styles.sliderLeft__text}>Be the first!</p>
              <button className={styles.sliderLeft__button}>order now</button>
            </div>
            <div className={styles.sliderRight}>
              <img
                className={classNames(styles.sliderRight__img, {
                  [styles['sliderRight__img--fade']]: fade,
                })}
                src={arrayOfImage[activeImg]}
                alt=""
              />
            </div>
          </div>
          <button onClick={nextImg} className={styles.slider__arrow}>
            <img src={getAssetUrl('icons/arrow_black_right.svg')} alt="" />
          </button>
        </div>
        <div className={styles.dashes}>
          {arrayOfImage.map((footerItems, index) => {
            const isActive = index === activeImg;

            return (
              <div
                key={footerItems}
                className={classNames(styles.dashes__item, {
                  [styles['dashes__item--active']]: isActive,
                })}
                onClick={() => handleImg(index)}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
