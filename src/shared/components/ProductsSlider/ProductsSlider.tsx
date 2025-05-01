import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { AllProducts } from '../../types/AllProducts/AllProducts';

import LeftArrow from '../../../assets/icons/slider-icons/left-arrow.svg';
// eslint-disable-next-line
import LeftArrowDisabled from '../../../assets/icons/slider-icons/left-arrow-disabled.svg';
import RightArrow from '../../../assets/icons/slider-icons/right-arrow.svg';
// eslint-disable-next-line
import RightArrowDisabled from '../../../assets/icons/slider-icons/right-arrow-disabled.svg';

type Props = {
  title: string;
  products: AllProducts[];
  sliderId: string;
  isHotPrice: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
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
            aria-label="Попередній продукт"
          >
            <img
              loading="lazy"
              className={styles.productSlider__leftBtnImage}
              src={isFirstSlide ? LeftArrowDisabled : LeftArrow}
              alt="Попередній продукт"
            />
          </button>
          <button
            className={styles.productSlider__rightBtn}
            id={`next${sliderId}`}
            disabled={isLastSlide}
            aria-label="Наступний продукт"
          >
            <img
              loading="lazy"
              className={styles.productSlider__rightBtnImage}
              src={isLastSlide ? RightArrowDisabled : RightArrow}
              alt="Наступний продукт"
            />
          </button>
        </div>

        <div className={styles.productSlider__products}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
              1119: {
                slidesPerView: 4,
                spaceBetween: 16,
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
