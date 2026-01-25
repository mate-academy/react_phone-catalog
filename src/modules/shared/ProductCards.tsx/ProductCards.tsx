import React, { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import cards from './ProductCards.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';
import cn from 'classnames';
import { useRef } from 'react';
import { Product } from '../../../types/Product';

type Props = {
  title: string;
  products: Product[];
};

export const ProductCards: React.FC<Props> = ({ title, products }) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1.3);

  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled =
    swiperRef.current &&
    activeIndex + slidesPerView >= swiperRef.current.slides.length;

  let isFullPrice = false;

  if (title === 'Brand new models') {
    isFullPrice = true;
  }

  return (
    <section className={cards.cards}>
      <div className="container">
        <div className={cards.cards__content}>
          <div className={cards.cards__top}>
            <h2 className={cards.cards__title}>{title}</h2>
            <div className={cards.cards__slides}>
              <button
                className={cn(cards.cards__slide, cards.cards__slide__left)}
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isPrevDisabled || false}
              ></button>
              <button
                className={cn(cards.cards__slide, cards.cards__slide__right)}
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isNextDisabled || false}
              ></button>
            </div>
          </div>
          <div className="cards__bottom">
            <Swiper
              modules={[Navigation]}
              onSwiper={swiper => (swiperRef.current = swiper)}
              onSlideChange={swiper => {
                setActiveIndex(swiper.activeIndex);
                setSlidesPerView(swiper.params.slidesPerView as number);
              }}
              slidesPerView={1.3}
              watchOverflow
              breakpoints={{
                400: { slidesPerView: 1.5 },
                450: { slidesPerView: 1.6 },
                490: { slidesPerView: 2, slidesPerGroup: 2 },
                600: { slidesPerView: 2.5 },
                750: { slidesPerView: 3, slidesPerGroup: 3 },
                900: { slidesPerView: 3.5 },
                1050: { slidesPerView: 4, slidesPerGroup: 4 },
              }}
              slidesPerGroup={1}
              spaceBetween={16}
            >
              {products.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} isFullPrice={isFullPrice} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
