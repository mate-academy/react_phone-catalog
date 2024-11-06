import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';
import './HotPricesSwiper.scss';
import styles from './HotPrices.module.scss';

import { ProductCard } from '../../../../components/ProductCard';
import { hotPricesPhones } from '../../../../constants/hotPrices';
import { Product } from '../../../../types/Product';

export const HotPrices = () => {
  const olderModels: Product[] = [...hotPricesPhones];

  return (
    <section className={styles.hotPricesContainer}>
      <h2 className={styles.title}>Hot prices</h2>
      <div className={styles.productCardsContainer}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          modules={[Navigation]}
          className="mySlider hotPrices"
          navigation={true}
        >
          {olderModels.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard product={phone} isDiscount={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
