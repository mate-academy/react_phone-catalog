import React from 'react';
import Slider from 'react-slick';
import styles from './HeroSlider.module.scss';
import image1 from '../../../assets/images/banner-phones-frst-picture.png';
import image2 from '../../../assets/images/banner-tablets.png';
import image3 from '../../../assets/images/category-accessories.png';
import { useTheme } from '../../../hooks/useTheme';

import arrowPrevLight from '../../../assets/images/Icons/light/arrowLeftLight.png';
import arrowPrevDark from '../../../assets/images/Icons/dark/arrowLeftDark.png';
import arrowNextLight from '../../../assets/images/Icons/light/arrowRightLight.png';
import arrowNextDark from '../../../assets/images/Icons/dark/arrowRightDark.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const HeroSlider = () => {
  const { theme } = useTheme();
  const images = [image1, image2, image3];

  const arrowPrev = theme === 'dark' ? arrowPrevDark : arrowPrevLight;
  const arrowNext = theme === 'dark' ? arrowNextDark : arrowNextLight;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={`${styles.slider} ${styles[theme]}`}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`image${index + 1}`}
              className={styles.slider__img}
            />
          </div>
        ))}
      </Slider>
      {/* Стрілки переміщення слайдів */}
      <div className={styles.arrowPrev}>
        <img src={arrowPrev} alt="previous" className={styles.arrowPrev__img} />
      </div>
      <div className={styles.arrowNext}>
        <img src={arrowNext} alt="next" />
      </div>
    </div>
  );
};
