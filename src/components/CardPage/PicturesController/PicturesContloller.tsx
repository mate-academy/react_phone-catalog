import React, { useState } from 'react';
import './PicturesControllerStyle.scss';
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Thumbs } from 'swiper/modules';

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const images = [
    'img/phones/apple-iphone-11/black/00.webp',
    'img/phones/apple-iphone-11/black/01.webp',
    'img/phones/apple-iphone-11/black/02.webp',
    'img/phones/apple-iphone-11/black/03.webp',
    'img/phones/apple-iphone-11/black/04.webp',
  ];

  return (
    <div className="My-swiper__wrapper">
      <Swiper
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="my-Swiper-Second"
      >
        {images.map(elem => (
          <SwiperSlide className="my-Swiper-Second__wrapper" key={elem + 1}>
            <div className="my-Swiper-Second__background">
              <img src={elem} className="my-Swiper-Second__img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        touchRatio={0}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="my-Swiper-Controller"
        navigation={false}
      >
        {images.map(elem => (
          <SwiperSlide className="my-Swiper-Controller__wrapper" key={elem + 2}>
            <img src={elem} className="my-Swiper-Controller__img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
