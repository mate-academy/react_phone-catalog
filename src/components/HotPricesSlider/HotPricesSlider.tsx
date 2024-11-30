import React, { useContext, useState } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductsContext } from '../../store/ProductsContext';
import { ProductCard } from '../ProductCard';
import icons from '../../assets/icons/icons.svg';
import styles from './HotPricesSlider.module.scss';
import { Category } from '../../types/Category';

export const HotPricesSlider: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const hotPriceModels = products.filter(
    product =>
      product.fullPrice > product.price && product.category === Category.Phones,
  );

  const isRegularShow = hotPriceModels.some(
    product => product.fullPrice > product.price,
  );

  return (
    <div className={`${styles.productCards} swiper-container`}>
      {hotPriceModels.length > 0 ? (
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
              disabled={activeIndex >= hotPriceModels.length - 1}
            >
              <svg className={styles.icon}>
                <use href={`${icons}#arrow-right-icon`}></use>
              </svg>
            </button>
          </div>

          <Swiper
            onSlideChange={({ activeIndex: newIndex }) => {
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
            {hotPriceModels.map(product => (
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
        <p>No iPhone 14 models available.</p>
      )}
    </div>
  );
};
