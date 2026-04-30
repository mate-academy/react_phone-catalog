/* eslint-disable no-param-reassign */
import './ProductSlider.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Product } from '../../../types/Product';
import SliderCard from './SliderCard/SliderCard';

type ProductSliderProps = {
  title: string;
  products: Product[];
};
const ProductSlider = ({ title, products }: ProductSliderProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="product-slider">
      <div className="product-slider__header">
        <h2 className="product-slider__title">{title}</h2>
        <div className="product-slider__nav">
          <button ref={prevRef} className="product-slider__nav-btn">
            &#8249;
          </button>
          <button ref={nextRef} className="product-slider__nav-btn">
            &#8250;
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          1200: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={swiper => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation === 'object'
          ) {
            (swiper.params.navigation as { prevEl?: Element | null }).prevEl =
              prevRef.current;
            (swiper.params.navigation as { nextEl?: Element | null }).nextEl =
              nextRef.current;
          }
        }}
        modules={[Navigation]}
        className="product-slider__swiper"
      >
        {products.map(product => (
          <SwiperSlide key={product.itemId} className="product-slider__slide">
            <SliderCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
