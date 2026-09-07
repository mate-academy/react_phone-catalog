import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Product } from '../types/Product';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type SwRef = SwiperRef & {
  slidePrev: VoidFunction;
  slideNext: VoidFunction;
};

type Props = {
  products: Product[];
  fullPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({ products, fullPrice }) => {
  const swiperRef = useRef<SwRef>();
  const [activeIndex, setActiveIndex] = useState(0);
  const isDisabledPrev = activeIndex === 0;
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  return (
    <div className="products-slider">
      <div className="products-slider__buttons">
        <button
          className={cn(
            'products-slider__button products-slider__button-prev',
            {
              'products-slider__button--disabled': isDisabledPrev,
            },
          )}
          id={'bannerPrev'}
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          disabled={isDisabledPrev}
        >
          <img src="/img/icons/SliderLeft.svg" />
        </button>
        <button
          className={cn(
            'products-slider__button products-slider__button-next',
            {
              'products-slider__button--disabled': isDisabledNext,
            },
          )}
          id={'bannerNext'}
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          disabled={isDisabledNext}
        >
          <img src="/img/icons/SliderRight.svg" />
        </button>
      </div>
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper as unknown as SwRef;
        }}
        onSlideChange={swiper => {
          setActiveIndex(swiper.activeIndex);
          setIsDisabledNext(swiper.isEnd);
        }}
        className="products-slider__swiper"
        spaceBetween={16}
        slidesPerView={4}
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 2.5,
          },
          1199: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              product={product}
              fullPrice={fullPrice}
              basePath={`../${product.category}/`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
