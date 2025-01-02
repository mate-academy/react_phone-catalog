import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCube, Autoplay } from 'swiper/modules';
import mainSlider from './MainSlider.module.scss';
import './swiper.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';

const bannerPhotos = [
  {
    id: 1,
    image: '/img/phones-slide.png',
    imageONTABLETS: '/img/phones-on-tablets.png',
  },
  {
    id: 2,
    image: '/img/tablets-slide.png',
    imageONTABLETS: '/img/tablets-on-tablets.png',
  },
  {
    id: 3,
    image: '/img/accessories-slide.png',
    imageONTABLETS: '/img/accessories-on-tablets.png.png',
  },
];

export const MainSlider = () => {
  const { themeSwitcher } = useContext(CatalogContext);

  return (
    <Swiper
      effect={'cube'}
      modules={[Navigation, Pagination, EffectCube, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{ prevEl: '.arrow__left', nextEl: '.arrow__right' }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      loop={true}
      className={mainSlider.MainSlider}
    >
      {bannerPhotos.map(image => {
        return (
          <SwiperSlide key={image.id} className={mainSlider.MainSlider__slide}>
            <button
              className="arrow__left"
              style={{
                width: '35px',
                height: 'auto',
                marginLeft: '2%',
              }}
              data-theme={themeSwitcher ? 'dark' : 'light'}
            >
              {'<'}
            </button>
            <img src={image.image} className={mainSlider.MainSlider__image} />
            <img
              src={image.imageONTABLETS}
              className={mainSlider.MainSlider__imageONTABLET}
            />
            <button
              className="arrow__right"
              style={{
                width: '35px',
                height: 'auto',
                marginRight: '2%',
              }}
            >
              {'>'}
            </button>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
