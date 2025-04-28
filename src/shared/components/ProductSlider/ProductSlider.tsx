/* eslint-disable import/no-extraneous-dependencies */
import classNames from 'classnames';
import { Product } from '../../types/Product';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { ArrowButton } from '../Icons/ArrowButtons/ArrowButton';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../../../features/ProductCard';

type Props = {
  title: string;
  goods: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, goods }) => {
  return (
    <section className={styles.ProductSlider}>
      <div className={styles.ProductSlider__top}>
        <h2>{title}</h2>
        <div className={styles.ProductSlider__buttons}>
          <ArrowButton
            className={classNames(
              styles.ProductSlider__button,
              styles.prevButton,
            )}
            direction="left"
          />

          <ArrowButton
            className={classNames(
              styles.ProductSlider__button,
              styles.nextButton,
            )}
            direction="right"
          />
        </div>
      </div>
      <div>
        <Swiper
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3 },
            960: { slidesPerView: 3.5 },
            1024: { slidesPerView: 4 },
          }}
          // slidesPerView={4}
          spaceBetween={16}
          navigation={{
            nextEl: `.${styles.nextButton}`,
            prevEl: `.${styles.prevButton}`,
          }}
        >
          {goods.map(item => (
            <SwiperSlide key={item.id}>
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
