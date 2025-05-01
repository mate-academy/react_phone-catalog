import React from 'react';
import styles from './NewModels.module.scss';
import iconPrev from '../../../img/icons/icon-arrow-left.png';
import iconNext from '../../../img/icons/icon-arrow-right.png';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../shared/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

type Props = {
  products: Product[];
};

export const NewModels: React.FC<Props> = ({ products }) => {
  return (
    <section className={styles.newModels}>
      <div className={styles.newModels__container}>
        <h2 className={styles.newModels__title}>Brand new models</h2>
        <div className={styles.newModels__buttons}>
          <button
            className={`${styles.newModels__button} ${styles.newModels__button_prev} newModelsPrev`}
          >
            <img src={iconPrev} alt="Icon-prev" />
          </button>
          <button
            className={`${styles.newModels__button} ${styles.newModels__button_next} newModelsNext`}
          >
            <img src={iconNext} alt="Icon-next" />
          </button>
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
        navigation={{ nextEl: '.newModelsPrev', prevEl: '.newModelsNext' }}
        modules={[Navigation]}
        className={styles.newModels__swiper}
      >
        {products.map(product => (
          <SwiperSlide key={product.itemId}>
            {/* <ProductCard {...product} /> */}
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
