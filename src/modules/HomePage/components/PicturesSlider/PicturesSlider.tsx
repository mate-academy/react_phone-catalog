import React, { useRef, useState } from 'react';
import './PicturesSlider.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

export const PicturesSlider: React.FC = () => {
  const arrPicture = [
    `${import.meta.env.BASE_URL}serviceImg/banners/banner-1.png`,
    `${import.meta.env.BASE_URL}serviceImg/banners/banner-2.png`,
    `${import.meta.env.BASE_URL}serviceImg/banners/banner-7.png`,
  ];

  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__up">
        <div
          className="icon icon-large"
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <div className="icon--arrow-left" />
        </div>

        <div className="pictures-slider__pictures">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSwiper={s => (swiperRef.current = s)}
            onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
          >
            {arrPicture.map((image, i) => (
              <SwiperSlide key={i}>
                <Link to="/phones/apple-iphone-14-pro-256gb-spaceblack">
                  <img src={image} className="pictures-slider__picture" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className="icon icon-large"
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <div className="icon--arrow-right" />
        </div>
      </div>

      <div className="pictures-slider__dots">
        {arrPicture.map((image, i) => (
          <div
            key={image}
            className={
              i === activeIndex
                ? 'pictures-slider__dot--active'
                : 'pictures-slider__dot--disactive'
            }
            onClick={() => swiperRef.current?.slideToLoop(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PicturesSlider;
