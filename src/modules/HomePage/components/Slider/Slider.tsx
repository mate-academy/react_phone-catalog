import styles from './Slider.module.scss';
import sliderImage1 from '../../../../../public/img/banner-accessories.png';
import sliderImage2 from '../../../../../public/img/banner-phones.png';
import sliderImage3 from '../../../../../public/img/banner-tablets.png';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const images = [sliderImage1, sliderImage2, sliderImage3];

export const Slider = () => {
  const [imageIndex, setImageindex] = useState(2);
  let swipeStartPosition = 0;
  let swipeDistance = 0;

  const previousImage = useCallback(() => {
    setImageindex(index => {
      if (index === 0) {
        return images.length - 1;
      }

      return index - 1;
    });
  }, []);

  const nextImage = useCallback(() => {
    setImageindex(index => {
      if (index === images.length - 1) {
        return 0;
      }

      return index + 1;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => nextImage(), 5000);

    return () => clearInterval(interval);
  }, [nextImage, imageIndex]);

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.slider__container}>
          <button onClick={previousImage} className={styles.slider__buttons}>
            <img src="./icons/ArrowLeft.svg" />
          </button>
          <div className={styles['slider__image-container']}>
            {images.map(image => {
              return (
                <img
                  key={image}
                  onTouchStart={e => {
                    swipeStartPosition = e.changedTouches[0].pageX;
                  }}
                  onTouchEnd={e => {
                    swipeDistance =
                      e.changedTouches[0].pageX - swipeStartPosition;
                    if (swipeDistance > 0) {
                      previousImage();
                    } else {
                      nextImage();
                    }
                  }}
                  style={{ translate: `${-100 * imageIndex}%` }}
                  loading="lazy"
                  className={styles.slider__image}
                  src={image}
                />
              );
            })}
          </div>
          <button onClick={nextImage} className={styles.slider__buttons}>
            <img src="./icons/ArrowRight.svg" />
          </button>
        </div>
        <div className={styles.slider__navigation}>
          {images.map((_, i) => {
            return (
              <span
                onClick={() => setImageindex(i)}
                className={cn(styles['slider__navigation-buttons'], {
                  'slider__navigation-buttons--is-Active': imageIndex === i,
                })}
                key={i}
              ></span>
            );
          })}
        </div>
      </div>
    </>
  );
};
