import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './Home.scss';

export const Home = () => {
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      loop: true,
      slidesPerView: 1,
      observer: true,
      observeParents: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="home">
      <div className="home__welcome">
        Welcome to Nice
        <br className="home__welcome--break" />
        Gadgets store!
      </div>
      <div className="home__slider swiper">
        <div className="home__slider--arrow swiper-button-prev">
          <img src="../../img/arrow-left.png" alt="left" />
        </div>
        <div className="swiper-wrapper">
          <div className="home__slider--screen-one swiper-slide"></div>
          <div className="home__slider--screen-two swiper-slide"></div>
          <div className="home__slider--screen-three swiper-slide"></div>
        </div>
        <div className="home__slider--arrow swiper-button-next">
          <img src="../../img/arrow-right.png" alt="right" />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};
