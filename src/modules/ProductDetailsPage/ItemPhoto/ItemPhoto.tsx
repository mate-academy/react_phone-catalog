import './styles.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperClass } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ProductItem } from '../../../types/ProductItem';

type Props = {
  item: ProductItem;
};

export const ItemPhoto: React.FC<Props> = ({ item }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!item) {
    return <p>Somthing went wrong</p>;
  }

  const swiperSlideSet = item.images.map((imageLink: string) => {
    return (
      <SwiperSlide key={imageLink}>
        <img src={imageLink} />
      </SwiperSlide>
    );
  });

  return (
    <div className="ItemPhoto_container">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="ItemPhoto_main"
      >
        {swiperSlideSet}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="ItemPhoto_thumbs"
      >
        {swiperSlideSet}
      </Swiper>
    </div>
  );
};
