import React, { useCallback, useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import { ProductCard } from '../ProductCard';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Product } from '../../types/ProductType';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = React.memo(
  ({ title, products }) => {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handleSlideChange = useCallback((s: SwiperClass) => {
      setIsBeginning(s.isBeginning);
      setIsEnd(s.isEnd);
    }, []);

    return (
      <div className={styles['product-slider']}>
        <div className={styles['product-slider__header']}>
          <h2>{title}</h2>
          <div className={styles['product-slider__buttons']}>
            <Button
              onClick={() => swiperRef.current?.slidePrev()}
              icon={ButtonType.Left}
              disabled={isBeginning}
              isDisabled={isBeginning}
              isRatio={true}
            />
            <Button
              onClick={() => swiperRef.current?.slideNext()}
              icon={ButtonType.Right}
              disabled={isEnd}
              isDisabled={isEnd}
              isRatio={true}
            />
          </div>
        </div>
        <Swiper
          key={products.length}
          className={styles['product-slider__wrapper']}
          simulateTouch={false}
          onSwiper={s => handleSlideChange(s)}
          onSlideChange={s => {
            handleSlideChange(s);
          }}
          onBeforeInit={swiper => {
            handleSlideChange(swiper);
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={4}
          slidesOffsetAfter={16}
          breakpoints={{
            0: { slidesPerView: 1.5, slidesOffsetAfter: 16 },
            640: { slidesPerView: 2.5, slidesOffsetAfter: 24 },
            1135: { slidesPerView: 4, slidesOffsetAfter: 0 },
          }}
        >
          {products.map((product: Product) => (
            <SwiperSlide
              className={styles['product-slider__card']}
              key={product.id}
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
);

ProductsSlider.displayName = 'ProductsSlider';
