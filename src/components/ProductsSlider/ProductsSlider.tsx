import './ProductsSlider.scss';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  blockClass: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, blockClass }) => {
  return (
    <div className="productsSlider new-models__slider">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${blockClass}__button--next`,
          prevEl: `.${blockClass}__button--prev`,
        }}
        className="swiper-products-2"
        spaceBetween={16}
        slidesPerView="auto"
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
