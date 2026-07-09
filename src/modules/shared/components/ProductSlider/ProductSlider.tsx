import React, { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import classNames from 'classnames';

import { ProductCard } from '../ProductCard/ProductCard';
import { ArrowUpIcon } from '../Icons';
import { SectionTitle } from '../SectionTitle';
import { Product } from '../../../../types/Product';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSlider.module.scss';

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
  const sliderId = useId().replace(/:/g, '');
  const prevBtnId = `prev-${sliderId}`;
  const nextBtnId = `next-${sliderId}`;

  const isNoOverflow = products.length <= 4;

  return (
    <section
      className={classNames(styles.sliderContainer, {
        [styles.noOverflow]: isNoOverflow,
      })}
    >
      <div className={styles.header}>
        <SectionTitle>{title}</SectionTitle>
        <div className={styles.navigation}>
          <button type="button" id={prevBtnId} className={styles.navBtn}>
            <span className={classNames(styles.separator, 'icon icon--left')}>
              <ArrowUpIcon />
            </span>
          </button>
          <button type="button" id={nextBtnId} className={styles.navBtn}>
            <span className={classNames(styles.separator, 'icon icon--right')}>
              <ArrowUpIcon />
            </span>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        className={styles.swiperWrap}
        navigation={{
          prevEl: `#${prevBtnId}`,
          nextEl: `#${nextBtnId}`,
        }}
        slidesOffsetAfter={16}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
            slidesOffsetAfter: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
            slidesOffsetAfter: 0,
          },
        }}
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
