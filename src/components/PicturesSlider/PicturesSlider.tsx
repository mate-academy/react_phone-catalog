import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames';

import styles from './PicturesSlider.module.scss';

import slide1 from '../../assets/img/slider/picture-1-desk.jpg';
import slide2 from '../../assets/img/slider/picture-2-desk.jpg';
import slide3 from '../../assets/img/slider/picture-3-desk.jpg';

const pictures = [slide1, slide2, slide3];

type ArrowButton = {
  className: string;
  onClick?: () => void;
  direction: string;
};

const CustomArrow = (props: ArrowButton) => {
  const { className, onClick, direction } = props;

  return (
    <button
      className={classNames(className, styles.arrow, styles[direction])}
      onClick={onClick}
    >
      <span
        className={classNames('icon', 'icon--arrow', {
          'icon--arrow--left': direction === 'prev',
          'icon--arrow--right': direction === 'next',
        })}
      ></span>
    </button>
  );
};

const CustomSlider = () => {
  const [activeItem, setActiveItem] = useState(0);

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    className: styles['slick-slider'],
    dots: true,
    dotsClass: styles['custom-dots'],
    afterChange: (current: number) => {
      setActiveItem(current);
    },
    customPaging: (i: number) => {
      return (
        <button
          className={classNames(styles.dot, {
            [styles['dot--active']]: i === activeItem,
          })}
        />
      );
    },
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <CustomArrow
        className={classNames(styles.arrow, styles.next)}
        direction="next"
      />
    ),
    prevArrow: (
      <CustomArrow
        className={classNames(styles.arrow, styles.prev)}
        direction="prev"
      />
    ),
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
        {pictures.map((picture, index) => (
          <div key={index} className={styles['slick-slider__slide']}>
            <img
              src={picture}
              alt={`picture-slide-${index}`}
              className={styles['slide-image']}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export const PicturesSlider = React.memo(CustomSlider);
