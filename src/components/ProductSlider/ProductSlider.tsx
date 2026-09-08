import React, { useRef } from 'react';
import styles from './ProductSlider.module.scss';
import { ProductCart } from '../ProductCart';
import { Product } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface ProductSliderProps {
  sliderTitle: string;
  filteredItems: Product[];
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  sliderTitle,
  filteredItems,
}) => {
  const uniqueItems = filteredItems.filter(
    (item, index, self) =>
      self.findIndex(i => i.image === item.image) === index,
  );

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const hideFullPrice = sliderTitle === 'Brand new models';

  return (
    <section className={styles.newModels}>
      <div className={styles.newModels__top}>
        <h2 className={styles.newModels__title}>{sliderTitle}</h2>
        <div className={styles.sliderBtns}>
          <button
            ref={prevRef}
            className={styles.sliderBtn}
            aria-label="prevEl"
          >
            ⟨
          </button>
          <button
            ref={nextRef}
            className={styles.sliderBtn}
            aria-label="nextEl"
          >
            ⟩
          </button>
        </div>
      </div>

      <div className={styles.newModels__bottom}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          onInit={swiper => {
            if (
              prevRef.current &&
              nextRef.current &&
              swiper.params.navigation
            ) {
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current;
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          className={styles.slider}
        >
          {uniqueItems.map(item => (
            <SwiperSlide
              key={item.id}
              style={{ minWidth: '212px', width: 'auto' }}
            >
              <ProductCart
                key={item.id}
                item={item}
                hideFullPrice={hideFullPrice}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
