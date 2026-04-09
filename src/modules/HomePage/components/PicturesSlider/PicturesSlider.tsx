import styles from './PicturesSlider.module.scss';

import { Product } from '../../../../../public/api/types/Product';
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

type PicturesSliderProps = {
  products: Product[] | null;
};

export const PicturesSlider: React.FC<PicturesSliderProps> = ({ products }) => {
  return (
    <>
      <div className={styles.picturesSlider}>
        <div className={styles.picturesSlider__layout}>
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect={'fade'}
            navigation={true}
            pagination={{
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
          >
            <div>
              {products.map(product => (
                <SwiperSlide
                  key={product.id}
                  className={styles.picturesSlider__banner}
                >
                  <div className={styles.picturesSlider__content}>
                    <div className={styles.picture}>
                      <img
                        src={`${product.image}`}
                        alt={product.name ?? 'Product Image'}
                        title={product.name ?? 'Product Image'}
                        // height={'100%'}
                        className={styles.picturesSlider__productImage}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};
