import type { Product } from '../../../types/Product';
import { SliderButton } from '../SliderButton';
import s from './CardsSlider.module.scss';
import { Card } from '../Card/Card';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';

import { useRef, useState } from 'react';
import 'swiper/css';

type Props = {
  products: Product[];
  name: string;
};

export const CardsSlider = ({ products, name }: Props) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className={s.cardsSlider}>
      <div className={s.cardsSlider__top}>
        <h2 className={s.cardsSlider__name}>{name}</h2>
        <div className={s.cardsSlider__buttons}>
          <SliderButton
            direction="left"
            disabled={isBeginning}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          />
          <SliderButton
            disabled={isEnd}
            onClick={() => swiperRef.current?.swiper.slideNext()}
          />
        </div>
      </div>
      <div className={s.cardsSlider__list}>
        <Swiper
          ref={swiperRef}
          spaceBetween={16}
          autoHeight={false}
          className={s.cardsSlider__swiper}
          style={{ overflow: 'visible' }}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
            },
            450: {
              slidesPerView: 1.6,
            },
            640: {
              slidesPerView: 2.5,
            },
            840: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id} className={s.cardsSlider__slide}>
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
