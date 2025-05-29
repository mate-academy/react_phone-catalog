/* eslint-disable max-len */
import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Card } from '../Card';
import { Navigation } from 'swiper/modules';

type Props = {
  recommendedItems: Product[];
};

export const RecommendedItems: React.FC<Props> = ({ recommendedItems }) => {
  const [isBeginning, setIsBeginning] = useState(true);

  return (
    <div className="recommendedItems">
      <div className="recommendedItems__header">
        <h2 className="recommendedItems__header--title">You may also like</h2>
        <div className="recommendedItems__header--buttons recommendedItems__slider--buttons">
          <button
            className="recommendedItems__slider--btn recommendedItems__slider--btn-prev"
            disabled={isBeginning}
          ></button>
          <button className="recommendedItems__slider--btn recommendedItems__slider--btn-next"></button>
        </div>
      </div>
      <div className="recommendedItems__swiper">
        <Swiper
          className="recommendedItems__list"
          spaceBetween={16}
          slidesPerView={1.5}
          speed={1000}
          navigation={{
            prevEl: '.recommendedItems__slider--btn-prev',
            nextEl: '.recommendedItems__slider--btn-next',
          }}
          modules={[Navigation]}
          onSwiper={swiper => setIsBeginning(swiper.isBeginning)}
          onSlideChange={swiper => setIsBeginning(swiper.isBeginning)}
          breakpoints={{
            320: {
              spaceBetween: 16,
              slidesPerView: 1.5,
            },
            450: {
              spaceBetween: 16,
              slidesPerView: 2,
            },
            640: {
              spaceBetween: 16,
              slidesPerView: 2.5,
            },
            800: {
              spaceBetween: 16,
              slidesPerView: 3,
            },
            1000: {
              spaceBetween: 16,
              slidesPerView: 3.5,
            },
            1200: {
              spaceBetween: 16,
              slidesPerView: 4,
              loop: false,
            },
          }}
        >
          {recommendedItems.map(product => (
            <SwiperSlide
              className="recommendedItems__list--card recommendedItems__card"
              key={product.id}
            >
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
