import { FC, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { ProductCard } from '../ProductCard';
import { ProductAllType } from '../../types/Product';
import './PromotionSlider.scss';

type Props = {
  products: ProductAllType[];
  title: string;
};

export const PromotionSlider: FC<Props> = ({ products, title }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <section className="slider">
        <div className="container slider__container">
          <div className="slider__body">
            <h2 className="slider__title h2">{title}</h2>
            <div className="slider__nav">
              <button
                ref={prevRef}
                className="swiper-button-prev slider-prev"
              ></button>
              <button
                ref={nextRef}
                className="swiper-button-next slider-next"
              ></button>
            </div>
          </div>
        </div>
        <Swiper
          className="swiper-slider"
          modules={[Navigation, A11y]}
          slidesPerView={4}
          spaceBetween={16}
          autoHeight
          onBeforeInit={swiper => {
            /* eslint-disable-next-line
            @typescript-eslint/ban-ts-comment */
            swiper.params.navigation = {
              /* @ts-ignore */
              ...swiper.params.navigation,
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            720: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          observer={true}
          observeParents={true}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};
