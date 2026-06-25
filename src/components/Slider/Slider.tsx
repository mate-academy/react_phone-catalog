import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import s from './Slider.module.scss';
import { Banner } from '../Banner';
import { data } from '../../assets/banner';

export const Slider = () => {
  return (
    <div className={s.slider}>
      <div className={s.slider__wrapper}>
        <button className={s.slider__prev}>
          <img src="img/icons/Arrow_left.png" alt="left" />
        </button>

        <Swiper
          className={s.slider__container}
          modules={[Pagination, Navigation, Keyboard, Autoplay]}
          slidesPerView={1}
          pagination={{
            el: `.${s.slider__pagination}`,
            renderBullet: (index, className) => {
              return `<span class="${className} ${s.slider__bullet} "></span>`;
            },
            clickable: true,
          }}
          loop={true}
          navigation={{
            prevEl: `.${s.slider__prev}`,
            nextEl: `.${s.slider__next}`,
          }}
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {data?.map(banner => {
            return (
              <SwiperSlide key={banner.id} className={s.slider__item}>
                <Banner
                  title={banner.title}
                  subTitle={banner.subTitle}
                  url={banner.url}
                  imgUrl={banner.imgUrl}
                  imgTitle={banner.imgTitle}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className={s.slider__next}>
          <img src="img/icons/Arrow_right.png" alt="left" />
        </button>
      </div>

      <div className={s.slider__pagination}>
        <span className={s.slider__bullet}></span>
        <span className={s.slider__bullet}></span>
        <span className={s.slider__bullet}></span>
      </div>
    </div>
  );
};
