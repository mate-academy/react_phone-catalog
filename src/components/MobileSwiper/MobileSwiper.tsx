import React, { FC, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import './MobileSwiper.scss';
import { CatalogProduct } from '../../types/CatalogProduct';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  title: string;
  products: CatalogProduct[];
};

export const MobileSwiper: FC<Props> = ({ title, products }) => {
  const currentSlider = useRef(null);

  const [isSlider] = useState(true);

  return (
    <div className="home-page__mobile-swiper mobile-swiper">
      <h2 className="slider__title">{title}</h2>

      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        ref={currentSlider}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              isSlider={isSlider}
              isProductsList={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
