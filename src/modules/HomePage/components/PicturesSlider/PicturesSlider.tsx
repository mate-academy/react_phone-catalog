import React from 'react';
import './PicturesSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  '../../../img/slider/slider-1.jpg',
  '../../../img/slider/slider-2.png',
  '../../../img/slider/slider-3.png',
];

export const PicturesSlider: React.FC = () => {
  return (
    <div className="slider-wrapper">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`Slide ${i + 1}`} className="slider-picture" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination" />
    </div>
  );
};
