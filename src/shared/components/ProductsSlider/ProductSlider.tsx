import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import styles from './ProductSlider.module.scss';

import { AllProducts } from '../../types/AllProduct/AllProduct';
import { ProductCard } from '../ProductCard/ProductCard';

import LeftArrow from '../../../assets/icons/slider-icons/left-arrow.svg';
import RightArrow from '../../../assets/icons/slider-icons/right-arrow.svg';
import LeftArrowDisabled from '../../../assets/icons/slider-icons/left-arrow-disabled.svg';
import RightArrowDisabled from '../../../assets/icons/slider-icons/right-arrow-disabled.svg';

type Props = {
  title: string;
  products: AllProducts[];
  sliderId: string;
  isHotPrice: boolean;
};
export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  sliderId,
  isHotPrice,
}) => {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  };

  return (
    <section className={styles.productSlider}>
      <div className={styles.productSlider__container}>
        <h2 className={styles.productSlider__title}>{title}</h2>
        <div className={styles.productSlider__btn}>
          <button
            className={styles.productSlider__leftBtn}
            id={`prev${sliderId}`}
            disabled={isFirstSlide}
          >
            <img
              src={isFirstSlide ? LeftArrowDisabled : LeftArrow}
              alt="Попередній продукт"
            />
          </button>
          <button
            className={styles.productSlider__rightBtn}
            id={`next${sliderId}`}
            disabled={isLastSlide}
          >
            <img
              src={isLastSlide ? RightArrowDisabled : RightArrow}
              alt="Попередній продукт"
            />
          </button>
        </div>

        <div className={styles.productSlider__products}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
              },
              640: {
                slidesPerView: 2.5,
              },
              1119: {
                slidesPerView: 4,
              },
            }}
            navigation={{
              prevEl: `#prev${sliderId}`,
              nextEl: `#next${sliderId}`,
            }}
            onSlideChange={handleSlideChange}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} isHotPrice={isHotPrice} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
