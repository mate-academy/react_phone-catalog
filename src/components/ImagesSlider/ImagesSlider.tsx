import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Mousewheel } from 'swiper/modules';
import React, { useState } from 'react';
import SwiperClass from 'swiper/types/swiper-class';

import 'swiper/css';
import 'swiper/css/thumbs';
import './ImagesSlider.scss';

type Props = {
  images: string[];
};

export const ImagesSlider: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  return (
    <>
      <Swiper
        modules={[Thumbs, Mousewheel]}
        thumbs={{ swiper: thumbsSwiper }}
        autoHeight={true}
        mousewheel={{ forceToAxis: true }}
        passiveListeners={false}
        className="big-slider"
        grabCursor={true}
      >
        {images.map(image => (
          <SwiperSlide className="big-slider__slide" key={image}>
            <img src={image} alt="product image" className="big-slider__img" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        watchSlidesProgress={true}
        onSwiper={setThumbsSwiper}
        slidesPerView={images.length}
        spaceBetween={8}
        breakpoints={{
          640: {
            direction: 'vertical',
          },
        }}
        className="small-slider"
      >
        {images.map(image => (
          <SwiperSlide className="small-slider__slide" key={image}>
            <img
              src={image}
              alt="product image"
              className="small-slider__img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
