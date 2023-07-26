/* eslint-disable no-console */
import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/swiper.min.css';

export type Product = {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string
};

type Props = {
  slides: Product[];
};

export const Slider: FC<Props> = ({ slides }) => {
  return (
    <Swiper
      // modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <img
            className="preview-slider__picture picture"
            src={slide.imageUrl}
            alt="Phones"
          />
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};
