import styles from './ProductSlider.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../../../types/Product';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon/Icon';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  products: Product[];
  title?: string;
};

export const ProductSlider = ({ products, title = 'Hot prices' }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation();

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className={styles.productSlider}>
      <div className={styles.productSliderHeader}>
        <h2 className={styles.productSliderTitle}>{title}</h2>
        <div className={styles.productSliderControls}>
          <IconButton
            icon={<Icon name="arrow-left" />}
            aria-label={t('common.previous')}
            onClick={handlePrev}
          />
          <IconButton
            icon={<Icon name="arrow-right" />}
            aria-label={t('common.next')}
            onClick={handleNext}
          />
        </div>
      </div>

      <div className={styles.productSliderWrapper}>
        <Swiper
          onSwiper={swiper => (swiperRef.current = swiper)}
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={'auto'}
          watchSlidesProgress={true}
          breakpoints={{
            320: {
              slidesPerView: 1.15,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 2.1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3.1,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          className={styles.productSliderList}
        >
          {products.map(product => (
            <SwiperSlide key={product.itemId}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
