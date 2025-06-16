/* eslint-disable no-param-reassign */
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './ProductsSlider.scss';
import { useRef } from 'react';

type Props = {
  products: Product[];
  sortBy?: keyof Product;
  showFullPrice?: boolean;
  isLightMode: boolean;
};

const sortProducts = (products: Product[], sortBy?: keyof Product) => {
  switch (sortBy) {
    case 'year':
    case 'fullPrice':
      return products.sort((a, b) => a[sortBy] - b[sortBy]);
    default:
      return products;
  }
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  sortBy,
  showFullPrice = false,
  isLightMode,
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div className="products-slider">
      <div
        ref={prevRef}
        className="products-slider__button-prev swiper-button-prev"
      ></div>
      <div
        ref={nextRef}
        className="products-slider__button-next swiper-button-next"
      ></div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={'auto' as const}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
          },
        }}
        onBeforeInit={swiper => {
          if (typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSwiper={(swiper: SwiperClass) => {
          setTimeout(() => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== 'boolean'
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }, 0);
        }}
        className="products__swiper"
      >
        {sortedProducts.map(product => (
          <SwiperSlide key={product.id} className="products__slide">
            <ProductCard
              product={product}
              withFullPrice={showFullPrice}
              isLightMode={isLightMode}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
