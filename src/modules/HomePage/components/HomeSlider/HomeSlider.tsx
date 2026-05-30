import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeSlider.scss';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const swiperContent = [
  {
    message: 'message',
    profile: '/img/banner-phones.png',
    brand: '/img/banner-tablets.png',
    name: 'Name',
    profileName: 'profileName',
  },
  {
    message: 'message',
    profile: '/img/banner-phones.png',
    brand: '/img/banner-tablets.png',
    name: 'Name',
    profileName: 'profileName',
  },
  {
    message: 'message',
    profile: '/img/banner-phones.png',
    brand: '/img/banner-tablets.png',
    name: 'Name',
    profileName: 'profileName',
  },
  {
    message: 'message',
    profile: '/img/banner-phones.png',
    brand: '/img/banner-tablets.png',
    name: 'Name',
    profileName: 'profileName',
  },
  {
    message: 'message',
    profile: '/img/banner-phones.png',
    brand: '/img/banner-tablets.png',
    name: 'Name',
    profileName: 'profileName',
  },
];

interface Props {
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  slidesPerView640?: number | 'auto';
  slidesPerView1024?: number | 'auto';
  prevClass: string;
  nextClass: string;
  paginationClass: string;
}

export const HomeSlider = ({
  spaceBetween = 0,
  slidesPerView = 1,
  slidesPerView640 = 1,
  slidesPerView1024 = 1,
  prevClass,
  nextClass,
  paginationClass,
}: Props) => {
  return (
    <>
      <div className="swiper__button_prev_container">
        <div className={`${prevClass} swiper__button_prev`}>&lt;</div>
      </div>
      <div className="swiper__controler">
        <Swiper
          className="swiper"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          pagination={{
            clickable: true,
            el: `.${paginationClass}`,
            type: 'bullets',
          }}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: slidesPerView640 },
            1024: { slidesPerView: slidesPerView1024 },
          }}
        >
          {swiperContent.map((content, index) => (
            <SwiperSlide key={index}>
              <div className="swiper__slide_container">
                <img
                  className="swiper__slide_img"
                  src={`${content.profile}`}
                  alt={content.name}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper__button_next_container">
        <div className={`${nextClass} swiper__button_next`}>&gt;</div>
      </div>
      <div className="swiper__pagination_container">
        <div className={`${paginationClass} swiper__pagination`}></div>
      </div>
    </>
  );
};
