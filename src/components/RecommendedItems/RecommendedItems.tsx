/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import { Product } from '../../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Card } from '../Card';
import SwiperCore from 'swiper';
import { SliderButton } from '../SliderButton';

type Props = {
  recommendedItems: Product[];
};

export const RecommendedItems: React.FC<Props> = ({ recommendedItems }) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperCore) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="recommendedItems">
      <div className="recommendedItems__header">
        <h2 className="recommendedItems__header--title">You may also like</h2>
        <div className="recommendedItems__header--buttons">
          <SliderButton
            direction="prev"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
          />
          <SliderButton
            direction="next"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
          />
        </div>
      </div>
      <div className="recommendedItems__swiper">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          className="recommendedItems__list"
          spaceBetween={16}
          slidesPerView={1.5}
          speed={1000}
          loop={false}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            450: { slidesPerView: 2 },
            640: { slidesPerView: 2.5 },
            800: { slidesPerView: 3 },
            1000: { slidesPerView: 3.5 },
            1200: { slidesPerView: 4 },
          }}
        >
          {recommendedItems.map(product => (
            <SwiperSlide
              className="recommendedItems__list--card"
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