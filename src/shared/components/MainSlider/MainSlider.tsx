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
    imageUrl: './img/33.jpg',
    link: '/phones',
    alt: 'Discover new phones',
  },
  {
    id: 2,
    imageUrl: './img/tablets-banner.png',
    link: '/tablets',
    alt: 'Explore our tablets',
  },
  {
    id: 3,
    imageUrl: './img/watch.jpg',
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
        >
          {heroBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link} className={s.sliderLink}>
                <img src={banner.imageUrl} alt={banner.alt} className={s.imgSlider} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button type="button" className={classNames(s.sliderButton, s.buttonNext)}>
          <img src={arrowRight} alt="Next" />
        </button>
      </div>

      <div className={s.paginationContainer}></div>
    </div>
  );
};
