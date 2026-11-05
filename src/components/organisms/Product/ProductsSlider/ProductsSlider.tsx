import { useMemo, useRef, useState } from 'react';

import classNames from 'classnames';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Typography } from '@/components/atoms';
import { ArrowButton } from '@/components/molecules';

import { useProductRatings } from '@/entities/product/model/product-ratings.queries';

import { ProductCard } from '../ProductCard';
import type { ProductsSlidesData } from './ProductsSlider.types';

import 'swiper/css';
import styles from './ProductsSlider.module.scss';

type Props = {
  data: ProductsSlidesData;
  className?: string;
};

export const ProductsSlider = ({ data, className }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { data: ratings = [] } = useProductRatings();

  const ratingsMap = useMemo(
    () => new Map(ratings.map((item) => [item.namespaceId, item])),
    [ratings],
  );

  const updateNavigation = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const productCards =
    data.isLoading ?
      Array.from({ length: 4 }, (_, index) => (
        <SwiperSlide
          className={styles.item}
          key={`skeleton-${index}`}
        >
          <ProductCard isLoading />
        </SwiperSlide>
      ))
    : data.productCards.map((product) => (
        <SwiperSlide
          className={styles.item}
          key={product.id}
        >
          <ProductCard
            product={product}
            rating={ratingsMap.get(product.namespace_id)}
          />
        </SwiperSlide>
      ));

  return (
    <section className={classNames(styles.container, className)}>
      <div className={styles.header}>
        <div>
          <Typography variant="h2">{data.sectionTitle}</Typography>

          {data.sectionSubTitle && (
            <Typography
              variant="bodytext"
              className={styles.subtitle}
            >
              {data.sectionSubTitle}
            </Typography>
          )}
        </div>

        <div className={styles.arrowButton}>
          <ArrowButton
            direction="left"
            disabled={isBeginning}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={`Show previous ${data.sectionTitle} products`}
          />

          <ArrowButton
            direction="right"
            disabled={isEnd}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={`Show next ${data.sectionTitle} products`}
          />
        </div>
      </div>

      <div className={styles.track}>
        <Swiper
          className={styles.swiper}
          slidesPerView={1.2}
          spaceBetween={16}
          watchOverflow
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavigation(swiper);
          }}
          onSlideChange={updateNavigation}
          onReachBeginning={updateNavigation}
          onReachEnd={updateNavigation}
          onFromEdge={updateNavigation}
          onResize={updateNavigation}
          onUpdate={updateNavigation}
        >
          {productCards}
        </Swiper>
      </div>
    </section>
  );
};
