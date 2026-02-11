import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/navigation';
import './NewProductsSlider.scss';
import styles from './NewProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { useNewProductsSlider } from './hooks/useNewProductsSlider';

const SKELETON_ITEMS = Array(4).fill(null);

export const NewProductsSlider = () => {
  const { t } = useTranslation();
  const { phones, isLoading, setSwiperInstance, handlePrev, handleNext } =
    useNewProductsSlider();

  return (
    <section className={`${styles.section} NewProductsSlider`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('sliders.newModels')}</h2>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
          >
            <img src="img/arrow_left.svg" alt={t('sliders.leftAlt')} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNext}
          >
            <img src="img/arrow_right.svg" alt={t('sliders.rightAlt')} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.skeletonRow}>
          {SKELETON_ITEMS.map((_, index) => (
            <ProductCardSkeleton key={`new-skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          onSwiper={setSwiperInstance}
          breakpoints={{
            320: {
              slidesPerView: 1.3333,
              spaceBetween: 16,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            800: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1000: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            1100: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          className={styles.swiper}
        >
          {phones.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard phone={phone} showRegularPriceOnly />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};
