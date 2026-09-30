/* eslint-disable @typescript-eslint/indent */
import { Product } from '../../Types/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

import 'swiper/css/pagination';
interface ProductsSliderProps {
  products: Product[];
  title?: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="productSlider">
      <div className="productSlider__header">
        <h2 className="productSlider__title">{title}</h2>
        <div className="productSlider__buttons">
          <button
            className="productSlider__button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            &lsaquo;
          </button>
          <button
            className="productSlider__button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            &rsaquo;
          </button>
        </div>
      </div>

      <Swiper
        className="productSlider__content"
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        spaceBetween={8}
        breakpoints={{
          0: { slidesPerView: 1.5, slidesPerGroup: 1 },
          760: { slidesPerView: 2.5, slidesPerGroup: 2 },
          960: { slidesPerView: 3, slidesPerGroup: 3 },
          1200: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        loop={true}
        speed={1500}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
