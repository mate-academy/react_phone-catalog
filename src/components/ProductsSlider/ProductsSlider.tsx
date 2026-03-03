/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import 'swiper/css';

import styles from './ProductsSlider.module.scss';
import { ProductSkeleton } from '../ProductSkeleton';

type Props = {
  title: string;
  products: Product[];
  isLoading: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  isLoading,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const countOfSkeletons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={styles.sliderContent}>
      <div className={styles.topBar}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttonsContainer}>
          <button className={styles.topButton} ref={node => setPrevEl(node)}>
            <ArrowLeftIcon />
          </button>

          <button className={styles.topButton} ref={node => setNextEl(node)}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div className={styles.swiper}>
        <Swiper
          spaceBetween={16}
          modules={[Navigation]}
          loop={false}
          navigation={{
            prevEl,
            nextEl,
          }}
          slidesPerView={'auto'}
        >
          {isLoading
            ? countOfSkeletons.map(item => (
                <SwiperSlide key={item} className={styles.slide}>
                  <ProductSkeleton />
                </SwiperSlide>
              ))
            : products.map(product => (
                <SwiperSlide key={product.id} className={styles.slide}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};
