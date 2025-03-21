/* eslint-disable react/display-name */
import React, { memo, useRef, useState } from 'react';
import s from './SliderPhones.module.scss';
import { Button } from '../Button';
import { Card } from '../Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  products: Product[];
  isHot?: boolean;
};

export const SliderPhones: React.FC<Props> = memo(
  ({ title, products, isHot }) => {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
      <section className={s.SliderPhones}>
        <h2 className={s.SliderPhones__title}>{title}</h2>
        <div className={s.SliderPhones__buttons}>
          <Button
            disabled={isStart}
            direction="arrowLeft"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <Button
            disabled={isEnd}
            direction="arrowRight"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>

        <Swiper
          observer={false}
          observeParents={false}
          resizeObserver={false}
          spaceBetween={16}
          slidesPerView={1.3}
          className={s.SliderPhones__slider}
          onSwiper={swiper => (swiperRef.current = swiper)}
          onSlideChange={swiper => {
            setIsStart(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map(p => (
            <SwiperSlide key={p.id}>
              <Card product={p} isHot={isHot} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  },
);
