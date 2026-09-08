import React, { useRef, useState } from 'react';
import styles from './BannerSlider.module.scss';
import banner1 from './../../assets/img/slider/slider-image-1.jpg';
import banner2 from './../../assets/img/slider/slider-image-2.jpg';
import banner3 from './../../assets/img/slider/slider-image-3.jpg';
import classNames from 'classnames';

// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'slick-carousel/slick/slick.css';
// import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import { Button } from '../Button';

const bannerImages = [banner1, banner2, banner3];

export const BannerSlider = () => {
  const [bannerId, setBannerId] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
    afterChange: (index: number) => setBannerId(index),
  };

  return (
    <div className={styles['banner-slider']}>
      <div className={styles['banner-slider__block']}>
        <Button
          icon={ButtonType.Left}
          onClick={() => sliderRef.current?.slickPrev()}
          className={styles['banner-slider__arrow']}
        />
        <Slider
          ref={sliderRef}
          className={styles['banner-slider__wrapper']}
          {...settings}
        >
          {bannerImages.map(image => (
            <img
              key={image}
              className={styles['banner-slider__slider-image']}
              src={image}
              alt="slide"
            />
          ))}
        </Slider>
        <Button
          icon={ButtonType.Right}
          className={styles['banner-slider__arrow']}
          onClick={() => sliderRef.current?.slickNext()}
        />
      </div>
      <ul className={styles['banner-slider__buttons']}>
        {bannerImages.map((image, i) => {
          return (
            <li
              key={image}
              className={classNames(styles['banner-slider__button'], {
                [styles['banner-slider__button--active']]: bannerId === i,
              })}
            >
              <button
                onClick={() => sliderRef.current?.slickGoTo(i)}
                className="icon icon--slider-button"
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
