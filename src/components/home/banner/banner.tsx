/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import styles from './banner.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../../assets/images/banners/Iphone14Pro_banner.jpg';
import banner2 from '../../../assets/images/banners/iphone-13pro.jpg';
import banner3 from '../../../assets/images/banners/iphone-12pro.jpg';

export const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    beforeChange: (current: any, next: React.SetStateAction<number>) =>
      setCurrentSlide(next),
    customPaging: (i: number) => (
      <div
        style={{
          width: '14px',
          height: '4px',
          backgroundColor: i === currentSlide ? '#313237' : '#E2E6E9',
          margin: '8px 5px 0',
          borderRadius: '2px',
          cursor: 'pointer',
        }}
      />
    ),
  };

  return (
    <section className={styles.banner}>
      <h2 className={styles.banner_title}>Welcome to Nice Gadgets store!</h2>
      <div className="slider-container">
        <Slider {...settings}>
          <div className={styles.banner_div}>
            <img src={banner1} alt="iphone-14-pro" />
          </div>
          <div className={styles.banner_div}>
            <img src={banner2} alt="iphone-13-pro" />
          </div>
          <div className={styles.banner_div}>
            <img src={banner3} alt="iphone-12-pro" />
          </div>
        </Slider>
      </div>
    </section>
  );
};
