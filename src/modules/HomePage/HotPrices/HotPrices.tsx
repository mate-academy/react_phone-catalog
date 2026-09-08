import React, { useState } from 'react';
import styles from './HotPrices.module.scss';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../shared/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import iconArrowLeftActive from '../../../img/icons/icon-arrow-left.png';
import iconArrowLeft from '../../../img/icons/icon-arrow-left-grey.png';
import iconArrowRightActive from '../../../img/icons/icon-arrow-right.png';
import iconArrowRight from '../../../img/icons/icon-arrow-right-grey.png';

type Props = {
  products: Product[];
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className={styles.hotPrices}>
      <div className={styles.hotPrices__container}>
        <h2 className={styles.hotPrices__title}>Hot prices</h2>
        <div className={styles.hotPrices__buttons}>
          <button
            className={`${styles.hotPrices__button} ${styles.hotPrices__button_prev} hotPricesPrev`}
            disabled={isBeginning}
            style={{
              backgroundImage: `url(${isBeginning ? iconArrowLeft : iconArrowLeftActive})`,
            }}
          ></button>
          <button
            className={`${styles.hotPrices__button} ${styles.hotPrices__button_next} hotPricesNext`}
            disabled={isEnd}
            style={{
              backgroundImage: `url(${isEnd ? iconArrowRight : iconArrowRightActive})`,
            }}
          ></button>
        </div>
      </div>

      <Swiper
        slidesPerView={1.4}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{ enabled: true }}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2.4,
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        navigation={{ nextEl: '.hotPricesNext', prevEl: '.hotPricesPrev' }}
        modules={[Navigation]}
        onSwiper={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className={styles.hotPrices__swiper}
      >
        {products.map(product => (
          <SwiperSlide key={product.itemId}>
            <ProductCard product={product} showFullPrice={true}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
