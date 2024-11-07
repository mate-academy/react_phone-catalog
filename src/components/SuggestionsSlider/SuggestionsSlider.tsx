import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';
import './SuggestionsSlider.scss';
import styles from './SuggestionsSlider.module.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import React from 'react';
import { SliderTitle } from '../../types/SliderTitle';

interface Props {
  productList: Product[];
  isDiscount?: boolean;
  title: SliderTitle;
}

export const SuggestionsSlider: React.FC<Props> = ({
  productList,
  isDiscount,
  title,
}) => {
  const products = [...productList];

  return (
    <section className={styles.suggestionsContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.productCardsContainer}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          modules={[Navigation]}
          className="mySlider SuggestionsSlider"
          navigation={true}
        >
          {products.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard product={phone} isDiscount={isDiscount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
