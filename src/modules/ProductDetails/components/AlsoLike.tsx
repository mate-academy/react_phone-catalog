import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './AlsoLike.module.scss';
import { useState } from 'react';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../../components/ProductCard';

type Props = {
  products: Product[];
};

export const AlsoLike: React.FC<Props> = ({ products }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section>
      <div className="container">
        <div className={styles.brandNewModels__top}>
          <h2 className={styles.brandNewModels__title}>You may also like</h2>

          <div className={styles.brandNewModels__buttons}>
            <button
              className={`${styles.brandNewModels__button} ${styles.brandNewModels__button_prev} brandNewModelsPrev`}
              disabled={isBeginning}
            ></button>
            <button
              className={`${styles.brandNewModels__button} ${styles.brandNewModels__button_next} brandNewModelsNext`}
              disabled={isEnd}
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
          navigation={{
            nextEl: '.brandNewModelsNext',
            prevEl: '.brandNewModelsPrev',
          }}
          modules={[Navigation]}
          onSwiper={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className={styles.brandNewModels__swiper}
        >
          {products.map(product => (
            <SwiperSlide key={product.itemId}>
              <ProductCard
                key={product.itemId}
                product={product}
                showFullPrice={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
