import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.scss';
import back from '../../img/arrowLeft.svg';
import goto from '../../img/arrowRight.svg';
import backLight from '../../img/arLeftLight.svg';
import gotoLight from '../../img/arRightLight.svg';
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from '../Themes';
import { useContext } from 'react';

const desktopImg = [
  'img/banner-dt-av.png',
  'img/banner-tablets.png',
  'img/banner-phones.png',
];

const mobImg = [
  'img/banner-mob-av.png',
  'img/banner-tablets-mob.png',
  'img/banner-phones-mob.png',
];

export const SliderSwiper = () => {
  const isMobile = useMediaQuery({ maxWidth: 550 });
  const images = isMobile ? mobImg : desktopImg;
  const { theme } = useContext(ThemeContext);

  const isBasicDark = theme === 'dark';

  return (
    <div>
      <div className="slider__wrapper">
        <button className="custom-prev">
          <img src={isBasicDark ? backLight : back} alt="<" />
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
          <img src={isBasicDark ? gotoLight : goto} alt=">" />
        </button>
      </div>
      <div id="pagination" className="custom-pagination"></div>
    </div>
  );
};
