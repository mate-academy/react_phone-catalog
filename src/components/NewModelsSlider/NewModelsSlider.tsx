import React, { useContext, useState } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductsContext } from '../../store/ProductsContext';
import { ProductCard } from '../ProductCard';
import icons from '../../assets/icons/icons.svg';
import styles from './NewModelsSlider.module.scss';
import { Category } from '../../types/Category';

export const BrandNewModelsSlider: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const newModels = products.filter(
    product =>
      product.name.toLowerCase().includes('iphone 14') &&
      product.category === Category.Phones,
  );
  const isRegularShow = newModels.some(
    product => product.fullPrice < product.price,
  );

  return (
    <div className={`${styles.productCards} swiper-container`}>
      {newModels.length > 0 ? (
        <>
          <div className={styles.navigation}>
            <button
              className={`${styles.navigationBtn} new-models-prev`}
              disabled={activeIndex === 0}
            >
              <svg className={styles.icon}>
                <use href={`${icons}#arrow-left-icon`}></use>
              </svg>
            </button>
            <button
              className={`${styles.navigationBtn} new-models-next`}
              disabled={activeIndex >= newModels.length - 1}
            >
              <svg className={styles.icon}>
                <use href={`${icons}#arrow-right-icon`}></use>
              </svg>
            </button>
          </div>

          <Swiper
            onSlideChange={({ activeIndex: newIndex }) =>
              setActiveIndex(newIndex)
            }
            spaceBetween={16}
            slidesPerView="auto"
            speed={1000}
            grabCursor={true}
            watchOverflow={true}
            modules={[Navigation]}
            navigation={{
              nextEl: '.new-models-next',
              prevEl: '.new-models-prev',
              disabledClass: 'swiper-button-disabled',
            }}
          >
            {newModels.map(product => (
              <SwiperSlide key={product.id} className={styles.swiperSlide}>
                <ProductCard
                  product={product}
                  showRegularPrice={isRegularShow}
                  imageWrapperSize="large"
                  category={Category.Phones}
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
