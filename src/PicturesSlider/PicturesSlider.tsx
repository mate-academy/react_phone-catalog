import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import styles from './PicturesSlider.module.scss';

export const PicturesSlider = () => {
  const [isMobile] = useState(window.innerWidth < 640);

  const images = [
    {
      image: isMobile ? 'img/Banner-phone.png' : 'img/Banner1.svg',
      alt: 'Banner 1',
    },
    { image: 'img/banner-phones.png', alt: 'Phones' },
    { image: 'img/banner-tablets.jpeg', alt: 'Tablets' },
    { image: 'img/banner-watches.png', alt: 'Accessories' },
  ];

  return (
    <div className={styles.pictures_slider}>
      <button className={`pictures-slider_prev ${styles.button_left}`}>
        <img src="img/Arrow-right.png" alt="Prev" />
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
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.pictures-slider_next',
          prevEl: '.pictures-slider_prev',
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        autoplay={{ delay: 5000 }}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.image}
              alt={image.alt}
              className={styles.picture_img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`pictures-slider_next ${styles.button_right}`}>
        <img src="img/Arrow-right.png" alt="Next" />
      </button>
    </div>
  );
};
