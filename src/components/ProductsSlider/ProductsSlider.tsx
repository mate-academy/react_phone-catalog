import React, { useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './ProductsSlider.module.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';

interface Props {
  products: Product[];
  mode?: 'newest' | 'discount';
}

const CustomSlider: React.FC<Props> = ({ products, mode }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const preparedProducts = useMemo(() => {
    let result = [...products];

    if (mode === 'newest') {
      result = result.sort((a, b) => b.year - a.year);
    }

    if (mode === 'discount') {
      result = result
        .filter(p => p.fullPrice && p.price && p.fullPrice > p.price)
        .sort((a, b) => b.fullPrice! - b.price! - (a.fullPrice! - a.price!));
    }

    return result.slice(0, 20);
  }, [products, mode]);

  return (
    <div className={styles.slider}>
      <button ref={prevRef} className={classNames(styles.arrow, styles.prev)}>
        <span className="icon icon--arrow-left"></span>
      </button>
      <button ref={nextRef} className={classNames(styles.arrow, styles.next)}>
        <span className="icon icon--arrow-right"></span>
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={swiper => {
          if (typeof swiper.params.navigation !== 'boolean') {
            const nav = swiper.params.navigation!;

            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 3,
          },
          500: {
            slidesPerView: 2,
          },
          100: {
            slidesPerView: 1,
          },
        }}
      >
        {preparedProducts.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} mode={mode} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const ProductsSlider = React.memo(CustomSlider);
