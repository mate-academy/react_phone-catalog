import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { MainSlider } from './MainSlider';
import bannerAccessories from '/img/banner-accessories.png';
import bannerPhones from '/img/banner-phones.png';
import bannerTablets from '/img/banner-tablets.png';

import 'swiper/css';
import 'swiper/css/pagination';
import './ImageSlider.scss';

const images = [bannerAccessories, bannerPhones, bannerTablets];

export default function SliderSwiper() {
  const { handlePrevSlide, handleNextSlide, onSwiperInit } = MainSlider();

  return (
    <div className="swiper--top">
      <div className="swiper--top__conteiner">
        <button className="swiper--top-button-prev" onClick={handlePrevSlide}>
          <img src="./icons/arrow-left-small.svg" alt="prev" />
        </button>

        <div className="swiper--top__images">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSwiper={onSwiperInit}
            loop={true}
            style={{ height: '100%' }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} style={{ height: '100%' }}>
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="swiper--top__banner"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button className="swiper--top-button-next" onClick={handleNextSlide}>
          <img src="./icons/arrow-right-small-active.svg" alt="next" />
        </button>
      </div>
    </div>
  );
}