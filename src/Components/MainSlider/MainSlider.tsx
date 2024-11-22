import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCube } from 'swiper/modules';
import './MainSlider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';

const bannerPhotos = [
  {
    id: 1,
    image: '/img/banner-phones.png',
    paddingTop: '14%',
    paddingBottom: '14%',
    margin: '0 auto',
  },
  {
    id: 2,
    image: '/img/banner-tablets.png',
    paddingTop: `10%`,
    paddingBottom: '5%',
    margin: '0 auto',
  },
  {
    id: 3,
    image: '/img/banner-accessories.png',
    paddingTop: '5%',
    paddingBottom: '3%',
    margin: '0 auto',
  },
];

export const MainSlider = () => {
  return (
    <Swiper
      effect={'cube'}
      modules={[Navigation, Pagination, EffectCube]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{ prevEl: '.arrow-left', nextEl: '.arrow-right' }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      grabCursor={true}
      loop={true}
      className="MainSlider"
    >
      {bannerPhotos.map(image => {
        return (
          <SwiperSlide key={image.id} className="MainSlider__slide">
            <button
              className="arrow-left"
              style={{
                width: '35px',
                height: 'auto',
                border: '1px solid black',
                marginLeft: '2%',
              }}
            >
              {'<'}
            </button>
            <img
              src={image.image}
              className="MainSlider__image"
              style={{
                paddingTop: `${image.paddingTop}`,
                paddingBottom: `${image.paddingBottom}`,
                margin: `${image.margin}`,
              }}
            />
            <button
              className="arrow-right"
              style={{
                width: '35px',
                height: 'auto',
                border: '1px solid black',
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
