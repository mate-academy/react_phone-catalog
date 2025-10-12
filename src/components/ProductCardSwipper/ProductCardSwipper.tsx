import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import { ProductCard } from "../ProductCard/ProductCard";
import React, { useRef } from 'react';

import './ProductCardSwipper.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import { ProductCard } from '../ProductCard/ProductCard';
import { CatalogItem } from '../../types/CatalogItem';

interface Props {
  blockName: string;
  products: CatalogItem[];
  showDiscount?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({ blockName, products, showDiscount = false }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="swipper">
      <div className="swipper__header">
        <h3 className="swipper__name">{blockName}</h3>
        <div className="swipper__buttons">
          <div ref={prevRef} className="swipper__button swipper__button--prev">
            <img src="./img/left.png" alt="left" className="swipper__button__img " />
          </div>
          <div ref={nextRef} className="swipper__button swipper__button--next">
            <img src="./img/right.png" alt="right" className="swipper__button__img " />
          </div>
        </div>
      </div>
      <div className="swipper__content">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swipper__button--prev',
            nextEl: '.swipper__button--next',
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
          breakpoints={{
            300: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            450: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            1000: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} showDiscount={showDiscount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
