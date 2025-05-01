/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from 'react';
import { Product } from '../../types/Product';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductCarouselSection.module.scss';

type Props = {
  sectionTitle?: string;
  products?: Product[];
};

export const ProductCarouselSection: React.FC<Props> = ({
  sectionTitle,
  products = [],
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperPrevBtnRef = useRef<HTMLButtonElement>(null);
  const swiperNextBtnRef = useRef<HTMLButtonElement>(null);

  const onBeforeInit = (swiper: SwiperType) => {
    Object.assign(swiper.params.navigation!, {
      prevEl: swiperPrevBtnRef.current,
      nextEl: swiperNextBtnRef.current,
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h2>{sectionTitle}</h2>
          <div className={styles['product-carousel__navigation-warpper']}>
            <button
              ref={swiperPrevBtnRef}
              className="button-box button-box--sm button--arrow-left"
            ></button>
            <button
              ref={swiperNextBtnRef}
              className="button-box button-box--sm button--arrow-right"
            ></button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: swiperPrevBtnRef.current,
            prevEl: swiperNextBtnRef.current,
          }}
          onBeforeInit={onBeforeInit}
          spaceBetween={16}
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.25,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2.5,
              centeredSlides: false,
            },
            1200: {
              slidesPerView: 4,
              centeredSlides: false,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
