import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard/ProductCard';
import { ArrowUpIcon } from '../Icons';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSlider.module.scss';
import { Product } from '../../../../types/Product';

interface Props {
  title: string;
  products: Product[];
  hasDiscount?: boolean;
}

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  hasDiscount,
}) => {
  return (
    <section className={styles.sliderContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.navigation}>
          <button id="prev-btn" className={styles.navBtn}>
            <ArrowUpIcon className={styles.prevIcon} />
          </button>
          <button id="next-btn" className={styles.navBtn}>
            <ArrowUpIcon className={styles.nextIcon} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={'auto'}
        navigation={{
          prevEl: '#prev-btn',
          nextEl: '#next-btn',
        }}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 16 },
          640: { slidesPerView: 2.5, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
        className={styles.swiper}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductCard product={product} hasDiscount={hasDiscount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
