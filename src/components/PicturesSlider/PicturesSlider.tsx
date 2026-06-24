/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './PicturesSlider.module.scss';
import classNames from 'classnames';

const slides = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

interface CustomArrowProps {
  className: string;
  onClick?: () => void;
  direction: string;
}

const CustomArrow = (props: CustomArrowProps) => {
  const { className, onClick, direction } = props;

  return (
    <button
      className={classNames(className, styles.arrow, styles[direction])}
      onClick={onClick}
    >
      <span
        className={classNames('icon', {
          'icon--arrow-left': direction === 'prev',
          'icon--arrow-right': direction === 'next',
        })}
      ></span>
    </button>
  );
};

const CustomSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    className: styles['slick-slider'],
    dots: true,
    dotsClass: styles['custom-dots'],
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
    customPaging: (i: number) => {
      return (
        <button
          className={classNames(styles.dot, {
            [styles['dot--active']]: i === currentSlide,
          })}
        />
      );
    },
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow className={styles.next} direction="next" />,
    prevArrow: <CustomArrow className={styles.prev} direction="prev" />,
  };

  useEffect(() => {
    const slickList = document.querySelector('.slick-list');

    if (slickList) {
      slickList.classList.add(styles['slick-list']);
    }
  });

  return (
    <div className={styles['slider-container']}>
      <Slider {...settings}>
        {slides.map((picture, index) => (
          <div key={index} className={styles['slick-slider__slide']}>
            <img
              src={picture}
              alt={`Slide #${index}`}
              className={styles['slide-image']}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export const PicturesSlider = React.memo(CustomSlider);
