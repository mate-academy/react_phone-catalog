import './MainSwiper.scss';
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
    <>

      <div className="main-swiper">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="custom-prev"
        ></button>{' '}
         <div className="slide__content--1">
            <h2 className="slide__title--1">
              Now available in our store
              <Link to="" className="slide__logo"></Link>
            </h2>
            <p className="slide__text--1">Be the first!</p>
            <button className="slide__button">ORDER NOW</button>
          </div>
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


          <div className="slide__content--2">
            <SwiperSlide>
              <img src="img/phones/apple-iphone-14-pro/spaceblack/00.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/phones/apple-iphone-14-pro/gold/00.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/phones/apple-iphone-14-pro/silver/00.webp" />
            </SwiperSlide>
          </div>
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="custom-next"
        ></button>
      </div>
    </>
  );
};

export default MainSwiper;
