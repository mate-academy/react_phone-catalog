/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';

import styles from './ProductsSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';

import { Mousewheel, Navigation } from 'swiper/modules';
import { Product } from '../../types/products';
import { ArrowDirection } from '../../types/arrowDirection';
import Arrow from '../Icons/Arrow/Arrow';
import CardItem from '../CardItem/CardItem';

type Props = {
  products: Product[];
};

const ProductsSlider: React.FC<Props> = ({ products }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className={styles.navigation}>
        <button ref={prevRef} className={classNames(styles.prev)}>
          <Arrow direction={ArrowDirection.left} />
        </button>

        <button ref={nextRef} className={classNames(styles.next)}>
          <Arrow direction={ArrowDirection.right} />
        </button>
      </div>
      <Swiper
        className={classNames(styles.swiper)}
        modules={[Navigation, Mousewheel]}
        spaceBetween={16}
        // slidesPerView={4}
        // slidesPerGroup={1}
        breakpoints={{
          320: { slidesPerView: 1.4 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3 },
          960: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: `.${styles.next}`,
          prevEl: `.${styles.prev}`,
        }}
        watchOverflow={true}
        key={products.length}
        onBeforeInit={swiper => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles['swiper-slide']}>
            <CardItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductsSlider;
