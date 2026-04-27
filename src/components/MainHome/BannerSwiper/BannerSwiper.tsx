import './BannerSwiper.scss';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Tablets from '../../../pages/tabletsPage/Tablets';

const MainSwiper = () => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const onAutoplayTimeLeft = (
    _: SwiperClass,
    time: number,
    progress: number,
  ) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        '--progress',
        String(1 - progress),
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const slides = [
    {
      mobile: './img/category-phones--purple--otherSide--phone.png',
      tablet: './img/category-phones--purple--otherSide--desktop.png',
      desktop: './img/category-phones--purple--otherSide--desktop.png',
    },
    {
      mobile: './img/category-phones--purple--phone.png',
      tablet: './img/category-phones--purple--desktop.png',
      desktop: './img/category-phones--purple--desktop.png',
    },
    {
      mobile: './img/category-phones--space-black--phone.webp',
      tablet: './img/category-phones--space-black--desktop.webp',
      desktop: './img/category-phones--space-black--desktop.webp',
    },
  ];

  return (
    <div className="swiper__container">
      <div className="swiper__content">
        <button className="custom-prev" id="prev-button" />
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '#prev-button',
            nextEl: '#next-button',
          }}
          pagination={{
            clickable: true,
            el: '#main-slider-pagination',
            bulletClass: 'swiper-bullet',
            bulletActiveClass: 'swiper-bullet-active',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="main-swiper">
                <div className="slide__content--1">
                  <h2 className="slide__title--1">
                    Now available in our store
                    <Link to="" className="slide__logo"></Link>
                  </h2>
                  <p className="slide__text--1">Be the first!</p>
                  <Link
                    to="/phones/apple-iphone-14-pro-128gb-spaceblack"
                    className="slide__button"
                  >
                    ORDER NOW
                  </Link>
                </div>
                <div className="slide__content--2">
                  <h3 className="slide__title--2">iPhone 14 Pro</h3>
                  <p className="slide__text--2">Pro Beyond</p>
                  <picture>
                    <source
                      srcSet={slide.desktop}
                      media="(min-width: 1200px)"
                    />
                    <source srcSet={slide.tablet} media="(min-width: 640px)" />
                    <img src={slide.mobile} className="slide__image" />
                  </picture>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button id="next-button" className="custom-next"></button>
      </div>
      <div id="main-slider-pagination" className="pagination" />
    </div>
  );
};

export default MainSwiper;
