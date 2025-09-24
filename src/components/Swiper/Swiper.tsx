import './Swiper.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import back from '../../assets/icons/arrowLeftL.svg';
import goto from '../../assets/icons/arrowRightL.svg';
import backLight from '../../assets/icons/arrowLeftLight.svg';
import gotoLight from '../../assets/icons/arrowRightLight.svg';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from 'react';
import { ThemeContext } from '../Themes';

const desktopImg = [
  'img/banner-dt-2k.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

const mobileImg = [
  'img/banner-mobmain.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const SliderSwiper = () => {
  const isMobile = useMediaQuery({ maxWidth: 550 });
  const images = isMobile ? mobileImg : desktopImg;
  const { theme } = useContext(ThemeContext);

  const isBasicDark = theme === 'dark';

  return (
    <div className="main__slider">
      <div className="slider__wrapper">
        <button className="custom-prev">
          <img src={isBasicDark ? back : backLight} alt="<" />
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
          <img src={isBasicDark ? goto : gotoLight} alt=">" />
        </button>
      </div>
      <div id="pagination" className="custom-pagination"></div>
    </div>
  );
};
