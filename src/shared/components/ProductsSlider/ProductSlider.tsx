import React, { useRef } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { NavigationOptions } from 'swiper/types';

import arrowLeft from '../../../assets/icons/ChevronArrowLeft.svg';
import arrowRight from '../../../assets/icons/ChevronArrowRight.svg';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const showOldPrice = title === 'Hot prices';
  const isHotPrices = title === 'Hot prices';

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section
      className={`${styles.section} ${isHotPrices ? styles.hotPrices : ''}`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button ref={prevRef} className={styles.arrow} aria-label="Previous">
            <img src={arrowLeft} alt="Previous" />
          </button>

          <button ref={nextRef} className={styles.arrow} aria-label="Next">
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={isHotPrices ? 3 : 4}
        breakpoints={{
          0: { slidesPerView: isHotPrices ? 1.2 : 1.6, spaceBetween: 8 },
          640: { slidesPerView: isHotPrices ? 2 : 2.5, spaceBetween: 12 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }}
        onBeforeInit={swiper => {
          const nav = swiper.params.navigation as NavigationOptions;

          nav.prevEl = prevRef.current;
          nav.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {products.map(p => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} showOldPrice={showOldPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
