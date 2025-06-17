import React, { useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
// import prev from '../../../public/img/btn-prev.png';
// import next from '../../../public/img/btn-next.png';

const prev = '/img/btn-prev.png';
const next = '/img/btn-next.png';

const images = [
  
  '/img/hero_iphone16pro_small.jpg',
  '/img/iphone16Pro(3).jpg',
  '/img/iphone16proIMG.jpg',
];

export const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setCurrentIndex(swiperRef.current.realIndex);
    }
  };

  return (
    <div className="container">
      <div className="banner">
        <h2 className="banner__title">Welcome to Nice Gadgets store!</h2>
        <div className="banner__slider">
          <button
            className="banner__slider__btn banner__slider__btn--prev"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <img
              className="banner__slider__btn--img"
              src={prev}
              alt="Previous"
            />
          </button>
          <Swiper
            className="banner__slider__list"
            slidesPerView={1}
            speed={1000}
            navigation={{
              prevEl: '.banner__slider__btn--prev',
              nextEl: '.banner__slider__btn--next',
            }}
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={0}
            breakpoints={{
              640: {
                spaceBetween: 19,
              },
              1200: {
                spaceBetween: 16,
              },
            }}
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="banner__slider__img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="banner__slider__btn banner__slider__btn--next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <img className="banner__slider__btn--img" src={next} alt="Next" />
          </button>
        </div>
        <div className="banner__dashes">
          {images.map((_, index) => (
            <span
              key={index}
              className={`banner__dash ${index === currentIndex ? 'active' : ''}`}
              onClick={() => swiperRef.current?.slideTo(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};