import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import styles from './ProductsSlider.module.scss';
import { SliderButtons } from '../SliderButtons/SliderButtons';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
// import { ArrowIcon } from '../Icons/ArrowIcon';

type Props = {
  products: Product[];
  type: string;
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, type, title }) => {
  return (
    <section className={styles.sliderProducts__wrapper}>
      <div className={styles.sliderProducts__title}>
        <h2>{title}</h2>
        <SliderButtons type={type} />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        navigation={{
          nextEl: `.swiper-button-next-${type}`,
          prevEl: `.swiper-button-prev-${type}`,
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
