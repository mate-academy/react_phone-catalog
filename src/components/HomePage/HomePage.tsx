import React from 'react';
import './HomeStyle.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import CardSlider from '../CardSlider/CardSlider';
import Categories from './Categories/Categories';

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__wrapper">
        <h1 className="home__title container ">
          Welcome to Nice Gadgets store!
        </h1>
        <div className="home__slider container">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="icons/swiper.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="icons/swiper.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="icons/swiper.jpg" alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="home__slider-card">
          <CardSlider title={'title'} />
        </div>
        <Categories />
        <div className="home__second-slider-card">
          <CardSlider title={'title 2'} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
