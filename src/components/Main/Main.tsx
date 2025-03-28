import { Categories } from '../Categories/Categories';
import { MainNewModels } from '../MainNewModels/MainNewModels';
import { HotPrices } from '../HotPrices/HotPrices';
import { ProductCard } from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import styles from './Main.module.scss';

export const Main: React.FC = () => {
  return (
    <>
      <MainNewModels />
      <Swiper
        slidesPerView={'auto'}
        
        grabCursor={true}
        className={styles.iphone_cards_swiper}
      >
        {[1, 2, 3, 4].map(id => {
          return (
            <SwiperSlide key={id}>
              <ProductCard />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Categories />
      <HotPrices />
      {/* <div className={`${styles.iphone_cards}`}>
        {[1, 2, 3, 4].map(() => {
          return <ProductCard />;
        })}
      </div> */}
    </>
  );
};
