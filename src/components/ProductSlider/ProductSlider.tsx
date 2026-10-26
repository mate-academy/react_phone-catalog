import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import { SliderButton } from '../ui/SliderButton/SliderButton';
import { ProductCard } from '../ProductCard/ProductCard';
import ChevronLeft from '../../../public/icons/chevron-arrow-left.svg?react';
import ChevronRight from '../../../public/icons/chevron-arrow-right.svg?react';
import { Product } from '../../types/Types';

import styles from './ProductSlider.module.scss';

type Props = {
  products: Product[];
  title: string;
  sliderTitle: string;
  showFullPrice?: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  sliderTitle,
  showFullPrice = false,
}) => {
  return (
    <article className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <SliderButton className={`products-slider-prev-${sliderTitle}`}>
            <ChevronLeft />
          </SliderButton>

          <SliderButton className={`products-slider-next-${sliderTitle}`}>
            <ChevronRight />
          </SliderButton>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.products-slider-prev-${sliderTitle}`,
          nextEl: `.products-slider-next-${sliderTitle}`,
        }}
        className={styles.list}
        spaceBetween={16}
        slidesPerView={1.4}
        watchOverflow
        breakpoints={{
          640: {
            slidesPerView: 2.5,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  );
};
