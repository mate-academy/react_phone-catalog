import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import '../../../../App.scss';
import { Navigation } from 'swiper/modules';
import { ModelItem } from '../ModelItem';
import { Products } from '../../../../types/Products';

interface Props {
  models: Products[];
  swiperIndex: number;
  modelsTitle: string;
}

export const Carousel: React.FC<Props> = ({
  models,
  swiperIndex,
  modelsTitle,
}) => {
  return (
    <div className="models__wrapper">
      <div className="models__carousel">
        <Swiper
          className="carousel__swiper"
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.25}
          navigation={{
            nextEl: `.swiper-button-next--${swiperIndex}`,
            prevEl: `.swiper-button-prev--${swiperIndex}`,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {models.map(model => (
            <SwiperSlide key={model.id}>
              <ModelItem model={model} modelsTitle={modelsTitle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
