import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

interface Props {
  title: string;
  items: Product[];
}

SwiperCore.use([Navigation]);

export const ProductsSlider: React.FC<Props> = ({ title, items }) => (
  <section className="section products-slider">
    <div className="section__container">
      <div className="products-slider__block">
        <div className="h1 products-slider__title">{title}</div>

        <Swiper
          data-cy="cardsContainer"
          speed={700}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            575: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            767: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1199: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          navigation
          className="products-slider__swiper"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
);
