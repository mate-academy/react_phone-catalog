import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { SwiperProductCard } from '../SwiperProductCard';
import './swiperSection.scss';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  products: Product[];
};

export const SwiperSection: React.FC<Props> = ({ title, products }) => {
  const id = title.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="swiper-section-wrapper">
      <div className="title-swiper-container">
        <div className="section-title">
          <h2>{title}</h2>
        </div>

        <div className="mini-swiper">
          <div
            className={`arrow arrow--left arrow--left-${id} has-shadow-cursor`}
          >
            <img className="icon" src="img/arrowLeft.svg" alt="Arrow Left" />
          </div>

          <div
            className={`arrow arrow--right arrow--right-${id} has-shadow-cursor`}
          >
            <img className="icon" src="img/arrowRight.svg" alt="Arrow Right" />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView="auto"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          prevEl: `.arrow--left-${id}`,
          nextEl: `.arrow--right-${id}`,
          disabledClass: 'arrow--disabled',
        }}
        className="swiperSection"
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <SwiperProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
