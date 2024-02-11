import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Product } from '../../Type/Product';
import { ProductCard } from '../ProductCard';

interface Props {
  products: Product[]
}

export const SlideList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <SwiperSlide>
          <ProductCard key={product.id} product={product} />
        </SwiperSlide>
      ))}
    </>
  );
};
