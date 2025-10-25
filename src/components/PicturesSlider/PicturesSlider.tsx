/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './PicturesSlider.module.scss';
import classNames from 'classnames';

type Dir = 'prev' | 'next';

const IMG_BASE = '/img/main-photos-home-page';

const banners = {
  purple: `${IMG_BASE}/iphone-14-pro-purple.png`,
  black: `${IMG_BASE}/iphone-14-pro-black.png`,
  gold: `${IMG_BASE}/iphone-14-pro-gold.png`,
} as const;

const slides = [banners.purple, banners.black, banners.gold];

interface CustomArrowProps {
  className: string;
  onClick?: () => void;
  direction: Dir;
}

const CustomArrow = ({ className, onClick, direction }: CustomArrowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={classNames(className, styles.arrow, styles[direction])}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={classNames('icon', {
          'icon--arrow-left': direction === 'prev' && !isHovered,
          'icon--arrow-right': direction === 'next' && !isHovered,
          'icon--arrow-left-hover': direction === 'prev' && isHovered,
          'icon--arrow-right-hover': direction === 'next' && isHovered,
        })}
      />
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
    afterChange: (current: number) => setCurrentSlide(current),
    customPaging: (i: number) => (
      <button
        className={classNames(styles.dot, {
          [styles['dot--active']]: i === currentSlide,
        })}
      />
    ),
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
        {slides.map((src, i) => (
          <div key={i} className={styles['slick-slider__slide']}>
            <img
              src={src}
              alt={`iPhone 14 Pro #${i + 1}`}
              className={styles['slide-image']}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export const PicturesSlider = React.memo(CustomSlider);
