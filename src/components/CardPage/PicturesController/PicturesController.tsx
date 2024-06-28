import React, { useState } from 'react';
import './PicturesControllerStyle.scss';
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Thumbs } from 'swiper/modules';

interface Props {
  urls: string[];
}

const PicturesContloller: React.FC<Props> = ({ urls }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="My-swiper__wrapper">
      <Swiper
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="my-Swiper-Second"
      >
        {urls.map(elem => (
          <SwiperSlide className="my-Swiper-Second__wrapper" key={elem + 1}>
            <div className="my-Swiper-Second__background">
              <img
                src={`${elem}`}
                className="my-Swiper-Second__img"
                alt="product"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        touchRatio={0}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="my-Swiper-Controller"
        navigation={false}
      >
        {urls.map(elem => (
          <SwiperSlide className="my-Swiper-Controller__wrapper" key={elem + 2}>
            <img
              src={`${elem}`}
              className="my-Swiper-Controller__img"
              alt="product"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PicturesContloller;
