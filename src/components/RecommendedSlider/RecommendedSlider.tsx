import React, { useState } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../ProductCard';
import icons from '../../assets/icons/icons.svg';
import styles from './RecommendedSlider.module.scss';
import { Product } from '../../types/Product';

type Props = {
  recommendedProducts: Product[];
};

export const RecomendedSlider: React.FC<Props> = ({ recommendedProducts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const isRegularShow = recommendedProducts.some(
    product => product.fullPrice > product.price,
  );

  return (
    <div className={`${styles.productCards} swiper-container`}>
      {recommendedProducts.length > 0 ? (
        <>
          <div className={styles.navigation}>
            <button
              className={`${styles.navigationBtn} hot-models-prev`}
              disabled={activeIndex === 0}
            >
              <svg className={styles.icon}>
                <use href={`${icons}#arrow-left-icon`}></use>
              </svg>
            </button>
            <button
              className={`${styles.navigationBtn} hot-models-next`}
              disabled={activeIndex >= recommendedProducts.length - 1}
            >
              <svg className={styles.icon}>
                <use href={`${icons}#arrow-right-icon`}></use>
              </svg>
            </button>
          </div>

          <Swiper
            onSlideChange={({ activeIndex: newIndex }: any) => {
              setActiveIndex(newIndex);
            }}
            grabCursor={true}
            spaceBetween={16}
            watchOverflow={true}
            slidesPerView="auto"
            speed={1000}
            modules={[Navigation]}
            navigation={{
              nextEl: '.hot-models-next',
              prevEl: '.hot-models-prev',
              disabledClass: 'swiper-button-disabled',
            }}
          >
            {recommendedProducts.map(product => (
              <SwiperSlide key={product.id} className={styles.swiperSlide}>
                <ProductCard
                  product={product}
                  showRegularPrice={isRegularShow}
                  imageWrapperSize="small"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <p>No Recommendation available.</p>
      )}
    </div>
  );
};
