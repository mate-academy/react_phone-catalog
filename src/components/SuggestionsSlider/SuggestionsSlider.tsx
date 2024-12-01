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
import classNames from 'classnames';

interface Props {
  productList: Product[];
  title: string;
}

export const SuggestionsSlider: React.FC<Props> = ({ productList, title }) => {
  const products = [...productList];

  return (
    <section
      className={classNames(styles.suggestionsContainer, {
        [styles.suggestionsContainerNoMarginB]:
          title === SliderTitle.suggestions,
      })}
    >
      <h2
        className={classNames(styles.title, {
          [styles.titleGridCol]: title === SliderTitle.suggestions,
          [styles.titleNewModels]: title === SliderTitle.newModels,
        })}
      >
        {title}
      </h2>
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
              <ProductCard product={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
