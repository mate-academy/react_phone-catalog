import React, { memo } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  section: string;
};

export const ProductsSlider: React.FC<Props> = memo(({ products, section }) => {
  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={4}
      grid={{ rows: 1, fill: 'column' }}
      spaceBetween={16}
      navigation={{
        nextEl: `.${section}__button--next`,
        prevEl: `.${section}__button--prev`,
        disabledClass: 'SliderBtn--disabled',
      }}
      allowTouchMove={false}
    >
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
