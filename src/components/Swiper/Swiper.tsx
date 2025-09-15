import './Swiper.module.scss';
import back from '../../../public/img/arrowLeft.svg';
import goto from '../../../public/img/arrowRight.svg';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';

const desktopImg = [
  'img/banner-dt.png',
  'img/banner-tablets.png',
  'img/banner-phones.png',
];

const mobileImg = [
  'img/banner-mob.png',
  'img/banner-tablets-mob.png',
  'img/banner-phones-mob.png',
];

export const SliderSwiper = () => {
  const isMobile = useMediaQuery({ maxWidth: 550 });
  const images = isMobile ? mobileImg : desktopImg;

  return (
    <div>
      <div className="slider__wrapper">
        <button className="custom-prev">
          <img src={back} alt="<" />
        </button>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          className="swiper"
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '#pagination' }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="slider__image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-next">
          <img src={goto} alt=">" />
        </button>
      </div>
      <div id="pagination" className="custom-paginatino"></div>
    </div>
  );
};
