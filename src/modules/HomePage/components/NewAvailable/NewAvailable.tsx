import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { ProductCard } from './Card/Card';
import { Product } from '@/shared/types/Product';
import container from '@/shared/styles/Container.module.scss';

import '@/modules/HomePage/components/NewAvailable';
import style from '../NewAvailable/NewAvailable.module.scss';

export const NewAvailable = ({ products }: { products: Product[] }) => {
  return (
    <section className={style.newAvailable}>
      <div className={container.container__newAvailable}>
        <div className={style.newAvailable__content}>
          <div className={style.prev}>
            <img src="icons/left.svg" alt="Previous" />
          </div>
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{
              el: `.${style.pagination}`,
              clickable: true,
            }}
            loop={true}
            speed={1000}
            slidesPerGroup={1}
            navigation={{
              prevEl: `.${style.prev}`,
              nextEl: `.${style.next}`,
            }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={style.next}>
            <img src="icons/right.svg" alt="Next" />
          </div>
        </div>
        <div className={style.pagination}></div>
      </div>
    </section>
  );
};
