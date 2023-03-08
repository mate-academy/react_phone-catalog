import { Pagination, Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import './ProductsSlider.scss';

type Props = {
  products: Product[],
  title: string,
  className: string,
};

export const ProductsSlider: React.FC<Props> = (
  { products, title, className },
) => {
  return (
    <div className={`${className}-slider`}>
      <div className="main-container">
        <div className={`${className}-slider__header`}>
          <h1>{title}</h1>
          <div className={`${className}-slider__control`}>
            <button
              type="button"
              className={`${className}-slider__button ${className}-slider__button--prev`}
            >
              <img
                src="icons/arrow.svg"
                alt="prev button"
              />
            </button>

            <button
              type="button"
              className={`${className}-slider__button ${className}-slider__button--next`}
            >
              <img
                src="icons/arrow.svg"
                alt="next button"
              />
            </button>
          </div>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          navigation={{
            nextEl: `.${className}-slider__button--next`,
            prevEl: `.${className}-slider__button--prev`,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            1200: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};
