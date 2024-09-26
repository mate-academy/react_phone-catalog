import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import styles from './PicturesSlider.module.scss';

const images = [
  { image: 'img/Banner1.svg', alt: 'Banner 1' },
  { image: 'img/banner-phones.png', alt: 'Phones' },
  { image: 'img/banner-tablets.png', alt: 'Tablets' },
  { image: 'img/banner-accessories.png', alt: 'Accessories' },
];

export const PicturesSlider: React.FC = () => {
  return (
    <div className={styles.picturesSlider}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.image}
              alt={image.alt}
              className={styles.slideImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
