/* eslint-disable no-param-reassign */
import styles from './ProductSlider.module.scss';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { FC, SetStateAction } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
  prevRef: React.RefObject<HTMLButtonElement>;
  nextRef: React.RefObject<HTMLButtonElement>;
  seCurrentElIndex: React.Dispatch<SetStateAction<number>>;
  type: 'hot' | 'new';
};

export const ProductSlider: FC<Props> = ({
  products,
  nextRef,
  prevRef,
  seCurrentElIndex,
  type,
}) => {
  return (
    <div className={styles.product__slider}>
      <div className={styles.slider__wrapper}>
        <Swiper
          loop={false}
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          onSlideChange={swiper => {
            seCurrentElIndex(swiper.realIndex);
          }}
          onBeforeInit={swiper => {
            swiper.params.navigation!.prevEl = prevRef.current;
            swiper.params.navigation!.nextEl = nextRef.current;
          }}
          navigation
        >
          {products.map(product => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard
                  key={product.id}
                  title={product.name}
                  fullPrice={product.fullPrice}
                  currentPrice={product.price}
                  descScreen={product.screen}
                  descCapacity={product.capacity}
                  descRAM={product.ram}
                  img={product.image}
                  type={type}
                  productId={product.itemId}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
