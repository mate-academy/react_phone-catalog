import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  productsForSlider: Product[];
  title: string;
  classMod: string;
};

export const ProductsSlider: React.FC<Props> = React.memo(
  ({ productsForSlider, title, classMod }) => (
    <section className="section">
      <div className="section__top">
        <h2 className="section__title">{title}</h2>
        <div className="section__buttons">
          <div
            className={`section__button section__button--prev section__button--prev--${classMod}`}
          ></div>
          <div
            className={`section__button section__button--next section__button--next--${classMod}`}
          ></div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Mousewheel]}
        slidesPerView={1.4}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2.4,
          },
          840: {
            slidesPerView: 3.4,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: `.section__button--next--${classMod}`,
          prevEl: `.section__button--prev--${classMod}`,
        }}
        mousewheel={{ forceToAxis: true }}
        rewind={true}
        className="section__swiper"
      >
        {productsForSlider.map(product => (
          <SwiperSlide key={product.id} className="section__slide">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  ),
);

ProductsSlider.displayName = 'ProductsSlider';
