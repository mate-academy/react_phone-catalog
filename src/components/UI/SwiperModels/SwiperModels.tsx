import React, { useEffect, useRef, useState } from 'react';

import styles from './SwiperModels.module.scss';

import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ProductCard } from '../ProductCard';

import { Product } from '@/types/product';

type Props = {
  sectionName: string;
  filteredProducts: Product[];
  isShowFullPrice: boolean;
};

export const SwiperModels: React.FC<Props> = ({
  sectionName,
  filteredProducts,
  isShowFullPrice,
}) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();

      updateButtonStates();

      swiperRef.current.on('slideChange', updateButtonStates);
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.off('slideChange', updateButtonStates);
      }
    };
  }, []);

  const updateButtonStates = () => {
    if (swiperRef.current) {
      const isBeginning = swiperRef.current.isBeginning;
      const isEnd = swiperRef.current.isEnd;

      setIsPrevDisabled(isBeginning);
      setIsNextDisabled(isEnd);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.swiperBottomWrap}>
        <h2 className={styles.section__title}>{sectionName}</h2>
        <div className={styles.customNavBtnWrap}>
          <button
            ref={prevRef}
            className={`${styles.customNavBtn} ${styles.customNavPrev}`}
            disabled={isPrevDisabled}
          >
            <ArrowLeft className={styles.arrowLeft} />
          </button>
          <button
            ref={nextRef}
            className={`${styles.customNavBtn} ${styles.customNavNext}`}
            disabled={isNextDisabled}
          >
            <ArrowRight className={styles.arrowRight} />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        slidesPerView={'auto'}
        spaceBetween={16}
        initialSlide={0}
        grabCursor={true}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {filteredProducts.map(product => (
          <SwiperSlide key={product.id} className={styles.swiperSlide}>
            <ProductCard product={product} isShowFullPrice={isShowFullPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
