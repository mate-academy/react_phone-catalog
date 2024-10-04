import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import styles from './PicturesSlider.module.scss';

export const PicturesSlider = () => {
  const images = [
    { image: 'img/Banner1.svg', alt: 'Banner 1' },
    { image: 'img/banner-phones.png', alt: 'Phones' },
    { image: 'img/banner-tablets.png', alt: 'Tablets' },
    { image: 'img/banner-accessories.png', alt: 'Accessories' },
  ];

  return (
    <div className={styles.pictures_slider}>
      <button className={styles.button_left}>
        <img src="../../public/img/Arrow-right.png" alt="" />
      </button>
      <Swiper
        style={{
          '--swiper-pagination-color': '#313237',
          '--swiper-pagination-bullet-inactive-color': '#999999',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-width': '14px',
          '--swiper-pagination-bullet-height': '4px',
          '--swiper-pagination-bullet-border-radius': '0px',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        autoplay={{ delay: 5000 }}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.image}
              alt={`Slide ${index + 1}`}
              className={styles.picture_img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={styles.button_right}>
        <img src="../../public/img/Arrow-right.png" alt="" />
      </button>
    </div>
  );
};
