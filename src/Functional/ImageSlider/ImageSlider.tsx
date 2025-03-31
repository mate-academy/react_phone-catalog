/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';
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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        navigation={isDesktop} // Використовуємо вбудовані кнопки Swiper
        allowTouchMove={true} // Сенсорне перегортання увімкнене
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="slider__image" src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
