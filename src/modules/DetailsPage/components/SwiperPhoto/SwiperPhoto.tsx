import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/thumbs';
import { Phone } from '../../../../types/Phone';
import { Tablet } from '../../../../types/Tablet';
import { Accessory } from '../../../../types/Accessory';

type Props = {
  selectedProduct: Phone | Tablet | Accessory | undefined;
};

export const SwiperPhoto: React.FC<Props> = ({ selectedProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 639);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = selectedProduct?.images || [];

  return (
    <div className="gallery">
      <div className="gallery__thumbs-main">
        <Swiper
          modules={[Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          className="gallery-main"
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="gallery__thumbs">
        <Swiper
          onSwiper={() => setThumbsSwiper}
          direction={isMobile ? 'horizontal' : 'vertical'}
          slidesPerView={5}
          spaceBetween={16}
          className="gallery-thumbs"
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperPhoto;
