import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';
import './NewModelsSwiper.scss';
import styles from './NewModels.module.scss';

import { ProductCard } from '../../../../components/ProductCard';
import { newPhoneModels } from '../../../../constants/newPhoneModels';
import { Product } from '../../../../types/Product';

export const NewModels = () => {
  const newModels: Product[] = [...newPhoneModels];

  return (
    <section className={styles.newModelsContainer}>
      <h2 className={styles.title}>Brand new models</h2>
      <div className={styles.productCardsContainer}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          modules={[Navigation]}
          className="mySlider newModels"
          navigation={true}
        >
          {newModels.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard product={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
