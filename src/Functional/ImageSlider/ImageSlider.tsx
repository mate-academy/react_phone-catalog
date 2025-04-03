import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageSlider.scss';

const images = [
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

export default function ImageSlider() {
  return (
    <div className="slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        allowTouchMove={true}
      >
        <button className="swiper-button-prev"></button>
        <button className="swiper-button-next"></button>

        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="slider__image-container">
              <img
                className="slider__image"
                src={image}
                alt={`Slide ${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
