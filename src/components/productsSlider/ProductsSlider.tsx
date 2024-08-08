/* eslint-disable operator-linebreak */
import { useContext, useRef } from 'react';
import './ProductsSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper';
import { ProductCard } from '../productCard/ProductCard';
import { Product } from '../../types/Product';
import { ItemCardSkeleton } from '../skeleton/ItemCardSkeleton';
import { ProductsContext } from '../../context/ProductsContext';

type Props = {
  title: string;
  products: Product[];
  newModels?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  newModels,
}) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const context = useContext(ProductsContext);
  const { isLoading } = context;

  return (
    <div className="products-slider">
      <div className="products-slider__top">
        <h2 className="products-slider__title">{title}</h2>

        <div className="products-slider__button-container">
          <button
            type="button"
            className="products-slider__button button left"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            {}
          </button>

          <button
            type="button"
            className="products-slider__button button right"
            onClick={() => swiperRef.current?.slideNext()}
          >
            {}
          </button>
        </div>
      </div>
      <div className="products-slider__swiper-wrapper">
        {isLoading && (
          <div className="skeleton-slide">
            <span>
              <ItemCardSkeleton />
            </span>
            <span>
              <ItemCardSkeleton />
            </span>
            <span>
              <ItemCardSkeleton />
            </span>
            <span>
              <ItemCardSkeleton />
            </span>
          </div>
        )}

        <Swiper
          modules={[Navigation, Scrollbar]}
          slidesPerView="auto"
          className="products-slider__swiper"
          loop
          onSwiper={(swiper: SwiperCore) => {
            swiperRef.current = swiper;
          }}
        >
          {products.map(item => (
            <SwiperSlide
              key={item.id}
              className="products-slider__slide-wrapper"
            >
              <ProductCard
                image={item.image}
                name={item.name}
                price={item.price}
                fullPrice={item.fullPrice}
                screen={item.screen}
                capacity={item.capacity}
                ram={item.ram}
                product={item}
                newModels={newModels}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
