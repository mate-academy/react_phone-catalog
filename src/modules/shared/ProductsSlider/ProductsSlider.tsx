import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Navigation } from 'swiper/modules';

import { Product } from '../../../types/Product';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
  priceType: 'regular' | 'discount';
};

export const ProductsSlider: FC<Props> = ({ title, products, priceType }) => {
  return (
    <section className="my-slider">
      <div className="my-slider__top">
        <h2 className="my-slider__title">{title}</h2>

        <div className="my-slider__buttons">
          <button
            className="
            my-slider__button my-slider__button--prev "
          ></button>

          <button
            className="
            my-slider__button my-slider__button--next "
          ></button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.my-slider__button--prev',
          nextEl: '.my-slider__button--next',
        }}
        spaceBetween={16}
        slidesPerView="auto"
        slidesPerGroup={2}
        speed={500}
        className="my-slider__body"
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className="my-slider__slide">
            <ProductCard product={product} priceType={priceType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
