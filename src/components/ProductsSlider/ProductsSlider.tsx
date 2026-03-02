import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import 'swiper/css';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [prevEl, setPrevEl] = useState<HTMLDivElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLDivElement | null>(null);

  return (
    <div className={styles.sliderContent}>
      <div className={styles.topBar}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttonsContainer}>
          <div className={styles.topButton} ref={node => setPrevEl(node)}>
            <ArrowLeftIcon />
          </div>

          <div className={styles.topButton} ref={node => setNextEl(node)}>
            <ArrowRightIcon />
          </div>
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
          {products.map(product => (
            <SwiperSlide key={product.id} className={styles.slide}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
