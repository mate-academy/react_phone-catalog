import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import { SwiperButton } from '../SwiperButton/SwiperButton';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductSlider.module.scss';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';

type ProductSliderProps = {
  title: string;
  mb?: boolean;
  products: Product[];
  discount?: boolean | undefined;
  isLoading: boolean;
};

export const ProductSlider: FC<ProductSliderProps> = ({
  title,
  mb,
  products,
  discount,
  isLoading,
}) => {
  const { arrowLeftUrl, arrowRightUrl } = useIconSrc();

  const skeletonCount = 6;

  return (
    <div className={styles.productContainer}>
      <h2
        className={styles.productTitle}
        style={{ marginBottom: mb ? '24px' : '0' }}
      >
        {title}
      </h2>
      <Swiper
        slidesPerView={'auto'}
        className={styles.productSlider}
        modules={[Navigation, FreeMode]}
        freeMode={true}
        spaceBetween={16}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            freeMode: false,
          },
        }}
      >
        <SwiperButton
          direction="prev"
          className={`${styles.productButtonPrev} swiper-button-prev`}
        >
          <img src={arrowLeftUrl} alt="arrowLeft" />
        </SwiperButton>
        <SwiperButton
          direction="next"
          className={`${styles.productButtonNext} swiper-button-next`}
        >
          <img src={arrowRightUrl} alt="arrowRight" />
        </SwiperButton>

        {(() => {
          if (isLoading) {
            return Array.from({ length: skeletonCount }).map((_, index) => (
              <SwiperSlide key={index} className={styles.productSlide}>
                <SkeletonCard />
              </SwiperSlide>
            ));
          } else {
            return products.slice(0, 15).map(item => (
              <SwiperSlide key={item.id} className={styles.productSlide}>
                <ProductCard product={item} fullPriceOnCard={discount} />
              </SwiperSlide>
            ));
          }
        })()}
      </Swiper>
    </div>
  );
};
