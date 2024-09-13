import React, { useEffect, useState } from "react"
import { Phone } from "../../types/Phone"
import { Tablet } from "../../types/Tablet"
import { Accessory } from "../../types/Accessory"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Thumbs } from 'swiper/modules';
import { useLocation } from "react-router-dom";

type Props = {
  currentProduct: Phone | Tablet | Accessory | undefined,
}

export const ImageGalery: React.FC<Props> = ({ currentProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentSwiper, setCurrentSwiper] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    if (thumbsSwiper && thumbsSwiper.slideTo) {
      thumbsSwiper.slideTo(0, 0);
      setTimeout(() => {
        thumbsSwiper.params.initialSlide = 0;
        thumbsSwiper.update();
        currentSwiper.slideTo(0);
      }, 100)
    }

  }, [location.pathname, thumbsSwiper]);

  return (
    <main className="image-galery">
      <Swiper
        className="image-galery__main-slider"
        modules={[Thumbs, EffectFade]}
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={setCurrentSwiper}
        speed={300}
        slidesPerView={1}
        breakpoints={{
          640: {
            direction: 'vertical',
          },
          0: {
            direction: 'horizontal',
          }
        }}
      >
        {currentProduct?.images.map((image, index) => (
          <SwiperSlide
            className="image-galery__main-slide"
            key={image || index}
          >
            <img
              src={`${image}`}
              alt="main-image"
              className="image-galery__main-image"

            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="image-galery__thumbs-slider"
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        centeredSlides={false}
        slidesPerView={5}
        breakpoints={{
          640: {
            direction: 'vertical',
          },
          0: {
            direction: 'horizontal',
          }
        }}
      >
        {currentProduct?.images.map((image, index) => (
          <SwiperSlide
            className="image-galery__thumbs-slide"
            key={image || index}
            style={{ aspectRatio: '1 / 1' }}
          >
            <img
              src={`${image}`}
              alt="thumbs-image"
              className="image-galery__thumbs-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  )
}
