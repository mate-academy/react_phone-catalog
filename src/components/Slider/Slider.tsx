import styles from './Slider.module.scss';

import { useEffect, useState } from 'react';
import image1 from '/img/banners/image1.png';
import image2 from '/img/banners/image2.png';
import image3 from '/img/banners/image3.png';
import { ArrowButton } from '../ArrowButton';
import { ArrowType } from '../../utils/types';
import classNames from 'classnames';

const IMAGES = [image1, image2, image3];

export const Slider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  //  #region functions

  const goToPreviousImage = () => {
    setImageIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : IMAGES.length - 1,
    );
  };

  const goToNextImage = () => {
    setImageIndex(prevIndex =>
      prevIndex < IMAGES.length - 1 ? prevIndex + 1 : 0,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 5000);

    return () => clearInterval(intervalId);
  }, [imageIndex]);

  // #endregion

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.slider__images}>
          <ArrowButton
            type={ArrowType.left}
            size="wide"
            onClick={goToPreviousImage}
          />
          <img
            className={styles.slider__image}
            src={IMAGES[imageIndex]}
            alt="slider image"
          />
          <ArrowButton
            type={ArrowType.right}
            size="wide"
            onClick={goToNextImage}
          />
        </div>
        <div className={styles.slider__buttons}>
          {IMAGES.map((_, index) => {
            return (
              <button
                key={index}
                className={classNames(styles.slider__button, {
                  [styles['slider__button--active']]: index === imageIndex,
                })}
                onClick={() => setImageIndex(index)}
              ></button>
            );
          })}
        </div>
      </div>
    </>
  );
};
