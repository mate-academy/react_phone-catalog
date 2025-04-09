import React from 'react';
import Slider from 'react-slick';
import styles from './SmallSlider2.module.scss';

export const SmallSlider2: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const images = [
    {
      src: '../../../public/img/banner-accessories.png',
      alt: 'The new line of SmartPhones',
    },
    {
      src: '../../../public/img/banner-phones.png',
      alt: 'New powerful tablet',
    },
    {
      src: '../../../public/img/banner-tablets.png',
      alt: 'Smart watch is on your watch',
    },
  ];

  return (
    <div className={styles.mainslider}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="main-slider__slide"
          />
        ))}
      </Slider>
    </div>
  );
};
