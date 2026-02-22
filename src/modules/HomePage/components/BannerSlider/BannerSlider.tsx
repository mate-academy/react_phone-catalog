import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import s from './BannerSlider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images: string[] = [
  '/img/banner-new-phone/hero__bdntboqignj6_xlarge.jpg',
  '/img/banner-new-phone/highlights_design_endframe__flnga0hibmeu_large_2x.jpg',
  '/img/banner-new-phone/highlights_ios__empnwsdz698i_large_2x.jpg',
];

export const BannerSlider = () => {
  return (
    <div className={`${s.banner_slider}`}>
      <h2 className="is-hidden">Banner Slider</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          enabled: false,
        }}
        breakpoints={{
          640: {
            navigation: {
              enabled: true,
            },
          },
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <figure className={`image ${s.banner_item}`}>
              <img src={src} alt={`slide-${index}`} />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Banner slider content goes here */}
      {/* <div className="is-flex">
        <button type="button" className={s.banner_slider__button}>
          <img className={s.stroke_icon} src={Stroke_left} alt="Previous" />
        </button>
        <div className={`mx-4 ${s.banner_item}`}>
          <img
            className={s.banner_item}
            src="/img/banner-new-phone/hero__bdntboqignj6_xlarge.jpg"
            alt="Iphone 17 Pro Max"
          />
        </div>
        <div className={`mx-4 ${s.banner_item}`}>
          <img
            className={s.banner_item}
            src="/img/banner-new-phone/highlights_design_endframe__flnga0hibmeu_large_2x.jpg"
            alt="Iphone 17 Pro Max"
          />
        </div>
        <div className={`mx-4 ${s.banner_item}`}>
          <img
            className={s.banner_item}
            src="/img/banner-new-phone/highlights_ios__empnwsdz698i_large_2x.jpg"
            alt="Iphone 17 Pro Max"
          />
        </div>
        <button type="button" className={s.banner_slider_button}>
          <img className={s.stroke_icon} src={Stroke_right} alt="Next" />
        </button>
      </div>
      <div className="buttons mt-5 is-flex is-justify-content-center is-align-items-center is-gap-3">
        <button type="button">
          <img src={Rectangle} alt="Slider Button" />
        </button>
        <button type="button">
          <img src={Rectangle} alt="Slider Button" />
        </button>
        <button type="button">
          <img src={Rectangle} alt="Slider Button" />
        </button>
      </div> */}
    </div>
  );
};
