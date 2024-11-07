import styles from '../ProductPage.module.scss';
import classNames from 'classnames';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import './ProductPageSlider.scss';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

interface Props {
  productName: string;
  images: string[];
}

export const ProductPageSlider: React.FC<Props> = ({ productName, images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className={classNames('mySwiper2', 'productPageSlider')}
      >
        {images.map((image: string) => (
          <SwiperSlide key={image}>
            <img src={image} alt={productName} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        // direction={'vertical'}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper productPageSlider"
      >
        {images.map((image: string) => (
          <SwiperSlide key={image}>
            <img src={image} alt={productName} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
