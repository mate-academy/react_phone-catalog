import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import s from './MainSlider.module.scss';
import arrowLeft from '../../../assets/images/icons/Chevron (Arrow Left).svg';
import arrowRight from '../../../assets/images/icons/Chevron (Arrow Right).svg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const heroBanners = [
  {
    id: 1,
    imageUrl: '/img/banner-phones.png',
    link: '/phones',
    alt: 'Discover new phones',
  },
  {
    id: 2,
    imageUrl: '/img/banner-tablets.png',
    link: '/tablets',
    alt: 'Explore our tablets',
  },
  {
    id: 3,
    imageUrl: '/img/banner-accessories.png',
    link: '/accessories',
    alt: 'Top accessories',
  },
];

export const MainSlider = () => {
  return (
    <div className={s.content}>
      <div className={s.sliderWrapper}>
        <button className={classNames(s.sliderButton, s.buttonPrev)}>
          <img src={arrowLeft} alt="Previous" />
        </button>
        <Swiper
          className={classNames(s.swiper, s.sliderSection)}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: `.${s.paginationContainer}`,
            bulletClass: s.bullet,
            bulletActiveClass: s.bulletActive,
          }}
          navigation={{
            prevEl: `.${s.buttonPrev}`,
            nextEl: `.${s.buttonNext}`,
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = `.${s.buttonPrev}`;
              swiper.params.navigation.nextEl = `.${s.buttonNext}`;
            }
            if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
              swiper.params.pagination.el = `.${s.paginationContainer}`;
            }
          }}
        >
          {heroBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link} className={s.sliderLink}>
                <img src={banner.imageUrl} alt={banner.alt} className={s.imgSlider} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={classNames(s.sliderButton, s.buttonNext)}>
          <img src={arrowRight} alt="Next" />
        </button>
      </div>

      <div className={s.paginationContainer}></div>
    </div>
  );
};
