import styles from './Slider.module.scss';

// #region sliderMobile
import sliderMobile1 from '../../../../shared/images/slider/slider-image-1.png';
import sliderMobile2 from '../../../../shared/images/slider/slider-image-2.png';
import sliderMobile3 from '../../../../shared/images/slider/slider-image-3.png';
// #endregion

// #region sliderDesktop
import sliderTablet1 from '../../../../shared/images/slider/tablet-image-1.png';
import slideTablet2 from '../../../../shared/images/slider/tablet-image-2.webp';
import sliderTablet3 from '../../../../shared/images/slider/tablet-image-3.jpg';
// #endregion
import sliderLeft from '../../../../shared/images/slider/arrow-left.png';
import sliderRight from '../../../../shared/images/slider/arrow-right.png';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';

export const Slider = () => {
  const images = [
    {
      mobile: sliderMobile1,
      tablet: sliderTablet1,
    },
    {
      mobile: sliderMobile2,
      tablet: slideTablet2,
    },
    {
      mobile: sliderMobile3,
      tablet: sliderTablet3,
    },
  ];
  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }, [index, images.length]);

  const handlePrev = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(images.length - 1);
    }
  }, [index, images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

  return (
    <div className={styles.slider}>
      <div className={styles.slider__wrapper}>
        <div className={styles.slider__button} onClick={handlePrev}>
          <img
            src={sliderLeft}
            alt="arrowleft"
            className={styles.slider__arrow}
          />
        </div>
        <div className={styles.slider__container} {...handlers}>
          <ul
            className={styles.slider__list}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((image, i) => (
              <li className={styles.slider__item} key={i}>
                <picture>
                  <source srcSet={image.tablet} media="(min-width: 640px)" />
                  <img
                    src={image.mobile}
                    alt={`image-${i}`}
                    className={styles.slider__image}
                  />
                </picture>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.slider__button} onClick={handleNext}>
          <img
            src={sliderRight}
            alt="arrowright"
            className={styles.slider__arrow}
          />
        </div>
      </div>
      <div className={styles.slider__bottom}>
        {images.map((_, i) => (
          <div
            key={i}
            className={classNames(styles.slider__rectangle, {
              [styles['slider__rectangle-active']]: i === index,
            })}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};
