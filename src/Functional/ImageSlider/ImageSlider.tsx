import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { MainSlider } from './MainSlider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageSlider.scss';

const images = [
  './img/banner-accessories.png',
  './img/banner-phones.png',
  './img/banner-tablets.png',
];

export default function SliderSwiper() {
  const { handlePrevSlide, handleNextSlide, onSwiperInit } = MainSlider();

  return (
    <div className="swiper--top">
      <div className="swiper--top__conteiner">
        <button className="swiper--top-button-prev" onClick={handlePrevSlide}>
          {'<'}
        </button>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper--top-button-next',
            prevEl: '.swiper--top-button-prev',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          className="swiper--top__images"
          onSwiper={onSwiperInit}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="swiper--top__banner"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper--top-button-next" onClick={handleNextSlide}>
          {'>'}
        </button>
      </div>
    </div>
  );
}
