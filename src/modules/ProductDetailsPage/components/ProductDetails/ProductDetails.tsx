import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './ProductDetails.module.scss';

import useMediaQuery from '../../../../shared/hooks/useMediaQuery';
import { Product } from '../../../../shared/types/Product/Product';
import { getClassLink } from '../../../../shared/utils/activeClassName';

type Props = {
  product: Product;
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const swiperDirection = isMobile ? 'horizontal' : 'vertical';

  return (
    <section className={styles.productOverview__details}>
      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className={styles.productOverview__mainImageSwiper}
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
      >
        {product.images.map(image => (
          <SwiperSlide key={image}>
            <img
              className={styles.productOverview__mainImage}
              src={`${image}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        direction={swiperDirection}
        slidesPerView={5}
        spaceBetween={8}
        modules={[Thumbs]}
        watchSlidesProgress
        className={styles.productOverview__imageWrapperSwiper}
        breakpoints={{
          1119: {
            spaceBetween: 16,
          },
        }}
        onSwiper={setThumbsSwiper}
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={image}>
            {' '}
            <div
              className={getClassLink({
                isActive: activeIndex === index,
                baseClass: styles.productOverview__imageWrapper,
                activeClass: styles.productOverview__imageWrapperActive,
              })}
            >
              <img
                className={styles.productOverview__thumbnail}
                src={`${image}`}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
