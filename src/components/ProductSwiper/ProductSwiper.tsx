/* eslint-disable */
import style from './ProductSwiper.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import React, { useState, useRef } from 'react';
import { Product } from '../../types/Product';
import { Card } from '../Card';
import { CardSkeleton } from '../Skeletons';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

type Props = {
  products: Product[];
  title: string;
  fullPrice: boolean;
  isLoading: boolean;
};

export const ProductSwiper: React.FC<Props> = ({
  products,
  title,
  fullPrice,
  isLoading,
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { theme } = useTheme();

  const updateState = () => {
    const swiper = swiperRef.current;

    if (!swiper) {
      return;
    }

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div>
      <article className={style.textAndButtons}>
        <h2 className={style.textAndButtons__tiile}>{title}</h2>

        <div className={style.textAndButtons__buttons}>
          <button
            className={style.textAndButtons__buttons__button}
            onClick={() => {
              swiperRef.current?.slidePrev();
            }}
            disabled={isBeginning}
          >
            <img
              src={
                theme === 'dark'
                  ? isBeginning
                    ? ICONS.prev
                    : ICONS.darkPrevActive
                  : isBeginning
                    ? ICONS.prev
                    : ICONS.prevActive
              }
              alt="prev"
            />
          </button>

          <button
            className={style.textAndButtons__buttons__button}
            onClick={() => {
              swiperRef.current?.slideNext();
            }}
            disabled={isEnd}
          >
            <img
              src={
                theme === 'dark'
                  ? isEnd
                    ? ICONS.next
                    : ICONS.darkNextActive
                  : isEnd
                    ? ICONS.next
                    : ICONS.nextActive
              }
              alt="prev"
            />
          </button>
        </div>
      </article>

      <div className={style.container}>
        <Swiper
          className={style.swiper}
          key={products.length}
          spaceBetween={16}
          slidesPerView="auto"
          watchSlidesProgress
          onInit={swiper => {
            swiperRef.current = swiper;
            updateState();
          }}
          onSlideChange={updateState}
          onTransitionEnd={updateState}
          onResize={updateState}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide
                  key={`skeleton-${index}`}
                  style={{ width: '272px' }}
                >
                  <CardSkeleton />
                </SwiperSlide>
              ))
            : products.map(product => (
                <SwiperSlide key={product.id} style={{ width: '272px' }}>
                  <Card product={product} fullPrice={fullPrice} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};
