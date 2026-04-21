import './BannerSwiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const MainSwiper = () => {
  const swiperRef = useRef(null);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        '--progress',
        String(1 - progress),
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="swiper__container">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="custom-prev"
      ></button>{' '}
      <div className="main-swiper">
        <div className="slide__content--1">
          <h2 className="slide__title--1">
            Now available in our store
            <Link to="" className="slide__logo"></Link>
          </h2>
          <p className="slide__text--1">Be the first!</p>
          <button className="slide__button">ORDER NOW</button>
        </div>
        <div className="slide__content--2">
          {' '}
          <h3 className="slide__title--2">iPhone 14 Pro</h3>
          <p className="slide__text--2">Pro Beyond</p>
          <Swiper
            onSwiper={swiper => (swiperRef.current = swiper)}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="../../../public/img/category-phones--purple--otherSide.png"
                className="slide__image"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="../../../public/img/category-phones--gold.png"
                className="slide__image"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="../../../public/img/category-phones.webp"
                className="slide__image"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="custom-next"
      ></button>
    </div>
  );
};

export default MainSwiper;
