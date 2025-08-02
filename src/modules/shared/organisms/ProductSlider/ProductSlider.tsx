import React, { useState } from 'react';
import classNames from 'classnames';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Product } from '../../../../types/Product';
import { ArrowButton } from '../../atoms/ArrowButton';
import { Typography } from '../../atoms/Typography';
import { ProductCard } from '../ProductCard';

import styles from './ProductSlider.module.scss';

type Props = {
  title: string;
  productsList: Product[];
  id: number;
  className?: string;
  infinite?: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  productsList,
  id,
  className,
  infinite = false,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className={styles.slider}>
      <div className={styles.slider__heading}>
        <Typography tag="h2" variant="h2" className={styles.slider__title}>
          {title}
        </Typography>
        <div className={styles.slider__controls}>
          <ArrowButton
            data-swiper-prev={id}
            className={classNames(
              styles.slider__button,
              styles['slider__button--left'],
            )}
            disabled={isBeginning && !infinite}
            direction="left"
          />
          <ArrowButton
            data-swiper-next={id}
            className={classNames(
              styles.slider__button,
              styles['slider__button--right'],
            )}
            disabled={isEnd && !infinite}
            direction="right"
          />
        </div>
      </div>
      <div className={styles.slider__swiper}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          loop={infinite}
          spaceBetween={16}
          navigation={{
            nextEl: `[data-swiper-next="${id}"]`,
            prevEl: `[data-swiper-prev="${id}"]`,
          }}
          slidesPerView="auto"
          className={classNames(
            styles.swiper,
            styles.margin_compensation,
            className,
          )}
        >
          {productsList.map(product => (
            <SwiperSlide key={product.id} className={styles.swiper__slide}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
