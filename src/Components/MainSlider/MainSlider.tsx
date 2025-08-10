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
    image: 'src/img/smartfon-OBRAZ_MAŁY.jpg',
    imageONTABLETS: 'src/img/Smartfon_OBRAZ-DUŻY.png',
  },
  {
    id: 2,
    image: 'src/img/tablety-OBRAZ_MAŁY.png',
    imageONTABLETS: 'src/img/Tablety_OBRAZ_DUŻY.png',
  },
  {
    id: 3,
    image: 'src/img/smartwatche-OBRAZ_MAŁY.png',
    imageONTABLETS: 'src/img/Smartwatche_OBRAZ-DUŻY.png',
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
