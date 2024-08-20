import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../../../src/App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Products } from '../../../../types/Products';
import { ModelItem } from '../ModelsItem';

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
          spaceBetween={8}
          slidesPerView={1.5}
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
