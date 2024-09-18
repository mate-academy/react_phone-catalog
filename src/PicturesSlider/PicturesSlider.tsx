import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/virtual';
import styles from './PicturesSlider.module.scss';

const images = [
  { image: '../../public/img/Banner1.png', alt: 'Banner 1' },
  { image: '../../public/img/banner-phones.png', alt: 'Phones' },
  { image: '../../public/img/banner-tablets.png', alt: 'Tablets' },
  {
    image: '../../public/img/banner-accessories.png',
    alt: 'Accessories',
  },
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
