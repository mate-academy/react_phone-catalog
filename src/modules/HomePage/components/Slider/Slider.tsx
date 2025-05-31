import styles from './Slider.module.scss';
import sliderImage1 from '../../../../../public/img/banner-accessories.png';
import sliderImage2 from '../../../../../public/img/banner-phones.png';
import sliderImage3 from '../../../../../public/img/banner-tablets.png';
import { useState } from 'react';

const images = [sliderImage1, sliderImage2, sliderImage3];

export const Slider = () => {
  const [imageIndex] = useState(2);

  return (
    <>
      <div className={styles.slider}>
        <button className={styles.slider__buttons}>
          <img src="public/icons/ArrowLeft.svg" />
        </button>
        <img className={styles.slider__image} src={images[imageIndex]} />
        <button className={styles.slider__buttons}>
          <img src="public/icons/ArrowRight.svg" />
        </button>
      </div>
    </>
  );
};
