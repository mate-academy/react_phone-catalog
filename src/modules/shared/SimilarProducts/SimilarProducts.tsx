import styles from './SimilarProducts.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import iconArrowLeftActive from '../../../img/icons/icon-arrow-left.png';
import iconArrowLeft from '../../../img/icons/icon-arrow-left-grey.png';
import iconArrowRightActive from '../../../img/icons/icon-arrow-right.png';
import iconArrowRight from '../../../img/icons/icon-arrow-right-grey.png';

import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../app/store/GlobalContext';
import { ProductCard } from '../ProductCard';

export const SimilarProducts = () => {
  const { products, selectedProduct } = useContext(GlobalContext);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const similarProducts = products
    .filter(
      product =>
        product.year === selectedProduct?.year &&
        product.price <= selectedProduct?.price + 200 &&
        product.itemId !== selectedProduct?.itemId,
    )
    .sort((a, b) => a.screen.localeCompare(b.screen));

  return (
    <section className={styles.similarProducts}>
      <div className={styles.similarProducts__wrapper}>
        <h3 className={styles.similarProducts__title}>You may also like</h3>
        <div className={styles.similarProducts__buttons}>
          <button
            className={`${styles.similarProducts__button} productsPrev`}
            disabled={isBeginning}
            style={{
              backgroundImage: `url(${isBeginning ? iconArrowLeft : iconArrowLeftActive})`,
            }}
          ></button>
          <button
            className={`${styles.similarProducts__button} productsNext`}
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
        navigation={{ nextEl: '.productsNext', prevEl: '.productsPrev' }}
        modules={[Navigation]}
        onSwiper={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className={styles.similarProducts__swiper}
      >
        {similarProducts.map(product => (
          <SwiperSlide key={product.itemId}>
            <ProductCard product={product} showFullPrice={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
