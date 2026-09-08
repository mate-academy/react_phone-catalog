import React from 'react';
import style from './Slider.module.scss';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductDetails } from '@/types/Products';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Props = {
  product: ProductDetails[];
};

export const Slider: React.FC<Props> = ({ product }) => {
  const productImage = product.flatMap(phone => phone.images);

  return (
    <div className={style.leftSide}>
      <div className={style.slider}>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          pagination={{
            el: '#swiper-pagination-product',
            clickable: true,
            bulletClass: `${style.paginationBullet}`,
            bulletActiveClass: `${style.paginationBulletActive}`,
            currentClass: `${style.paginationBulletTile}`,
            renderBullet: (index, className) => `
                        <span class="${className}">
                          <img src="${productImage[index]}" alt="Bullet ${index}" class="${style.paginationBulletImg}" />
                        </span>
                      `,
          }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <div className={style.slideContent}>
            {product.map(phone =>
              phone.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className={style.slide}>
                    <img src={image} alt="slide" className={style.slideImg} />
                  </div>
                </SwiperSlide>
              )),
            )}
          </div>
        </Swiper>
      </div>

      <div id="swiper-pagination-product" className={style.pagination}></div>
    </div>
  );
};
