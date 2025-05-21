/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

import './ProductsSlider.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../product-card';

interface Props {
  products: Product[];
  showFullPrice?: boolean;
  navigationOffset?: number;
  sortBy?: keyof Product;
}

const sortProducts = (products: Product[], sortBy?: keyof Product) => {
  switch (sortBy) {
    case 'fullPrice':
    case 'year':
      return products.sort((a, b) => b[sortBy] - a[sortBy]);
    default:
      return products;
  }
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  showFullPrice = false,
  navigationOffset = -35,
  sortBy,
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const swiperSettings = {
    modules: [Navigation],
    speed: 500,
    slidesPerView: 'auto' as const,
    spaceBetween: 16,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    onSwiper: (swiper: SwiperClass) => {
      setTimeout(() => {
        if (
          swiper.params.navigation &&
          typeof swiper.params.navigation !== 'boolean'
        ) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }
      }, 0);
    },
  };

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div className="products-slider">
      <div
        ref={prevRef}
        className="products-slider__button-prev swiper-button-prev"
        style={{ top: navigationOffset + 'px' }}
      ></div>
      <div
        ref={nextRef}
        className="products-slider__button-next swiper-button-next"
        style={{ top: navigationOffset + 'px' }}
      ></div>

      <Swiper {...swiperSettings}>
        {sortedProducts.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} withFullPrice={showFullPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
