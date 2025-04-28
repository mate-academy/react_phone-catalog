/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';

import styles from './ProductsSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';

import { Mousewheel, Navigation } from 'swiper/modules';
import { Product } from '../../types/products';
import { ArrowDirection } from '../../types/arrowDirection';
import Arrow from '../Icons/Arrow/Arrow';
import ProductItem from '../ProductItem/ProductItem';

type Props = {
  products: Product[];
};

const ProductsSlider: React.FC<Props> = ({ products }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.ProductsSlider}>
      <div className={styles.ProductsSlider__navigation}>
        <button ref={prevRef} className={classNames(styles.prev)}>
          <Arrow direction={ArrowDirection.left} />
        </button>
        <button ref={nextRef} className={classNames(styles.next)}>
          <Arrow direction={ArrowDirection.right} />
        </button>
      </div>
      <div className={styles.ProductsSlider__wrapper}>
        <Swiper
          className={classNames(styles.swiper)}
          modules={[Navigation, Mousewheel]}
          spaceBetween={16}
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
            <SwiperSlide
              key={`${product.id}-slider`}
              className={styles['swiper-slide']}
            >
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsSlider;
