import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import styles from './ProductsSlider.module.scss';
import { SliderButtons } from '../SliderButtons/SliderButtons';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  type: string;
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, type, title }) => {
  return (
    <section className={styles.sliderProducts}>
      <div className={styles.sliderProducts__title}>
        <h2>{title}</h2>
        <SliderButtons type={type} />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.3}
        breakpoints={{
          375: {
            slidesPerView: 1.5,
          },
          425: {
            slidesPerView: 1.8,
          },
          540: {
            slidesPerView: 2.3,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: `.swiper-button-next-${type}`,
          prevEl: `.swiper-button-prev-${type}`,
        }}
      >
        {products.map(product => (
          <SwiperSlide
            key={product.id}
            className={styles.sliderProducts__slide}
          >
            <ProductCard product={product} productSlider />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
