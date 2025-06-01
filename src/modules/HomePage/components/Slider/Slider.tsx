import styles from './Slider.module.scss';
import sliderImage1 from '../../../../../public/img/banner-accessories.png';
import sliderImage2 from '../../../../../public/img/banner-phones.png';
import sliderImage3 from '../../../../../public/img/banner-tablets.png';
import { useCallback, useState } from 'react';

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

  return (
    <>
      <div className={styles.slider}>
        <button onClick={previousImage} className={styles.slider__buttons}>
          <img src="public/icons/ArrowLeft.svg" />
        </button>
        <img
          onTouchStart={e => {
            swipeStartPosition = e.changedTouches[0].pageX;
          }}
          onTouchMove={e => e.preventDefault()}
          onTouchEnd={e => {
            swipeDistance = e.changedTouches[0].pageX - swipeStartPosition;
            if (swipeDistance > 0) {
              nextImage();
            } else {
              previousImage();
            }
          }}
          loading="lazy"
          className={styles.slider__image}
          src={images[imageIndex]}
        />
        <button onClick={nextImage} className={styles.slider__buttons}>
          <img src="public/icons/ArrowRight.svg" />
        </button>
      </div>
    </>
  );
};
