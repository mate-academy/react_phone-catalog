import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import './MainSwiperStyle.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const MainSwiper = () => {
  const prevButtonId = `prev-${uuidv4()}`;
  const nextButtonId = `next-${uuidv4()}`;

  return (
    <>
      <button className="home-slider__prev" id={prevButtonId}>
        <img
          src="icons/arrow-up-black.png"
          alt="arrow"
          className="home-slider__prev--img"
        />
      </button>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: `#${nextButtonId}`,
          prevEl: `#${prevButtonId}`,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <img src="icons/swiper.jpg" alt="" className="image-under__dekstop" />
          <img
            src="img/iPhone-11-Pro-Inner-Banner.webp"
            alt=""
            className="image-upper__dekstop"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src="icons/swiper.jpg" alt="" className="image-under__dekstop" />
          <img
            src="img/iconic_STORY_LEVEL_BANNER_1600x483.jpg"
            alt=""
            className="image-upper__dekstop"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src="icons/swiper.jpg" alt="" className="image-under__dekstop" />
          <img
            src="img/banner-phones.png"
            alt=""
            className="image-upper__dekstop"
          />
        </SwiperSlide>
      </Swiper>
      <button id={nextButtonId} className="home-slider__next">
        <img
          src="icons/arrow-up-black.png"
          alt="arrow"
          className="home-slider__next--img"
        />
      </button>
    </>
  );
};

export default MainSwiper;
