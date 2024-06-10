import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import '/react_phone-catalog/src/App.scss';
import { Navigation } from 'swiper/modules';
import { ModelItem } from '../ModelItem';
import { Products } from '../../../../types/Products';

interface Props {
  models: Products[];
  swiperIndex: number;
  modelsTitle: string;
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  favourites: number[];
  cart: number[];
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
}

export const Carousel: React.FC<Props> = ({
  models,
  swiperIndex,
  modelsTitle,
  setFavourites,
  favourites,
  cart,
  setCart,
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
              <ModelItem
                model={model}
                modelsTitle={modelsTitle}
                favourites={favourites}
                setFavourites={setFavourites}
                cart={cart}
                setCart={setCart}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
