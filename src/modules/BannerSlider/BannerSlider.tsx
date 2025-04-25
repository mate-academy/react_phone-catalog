import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import styles from './BannerSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './SwiperStyles.scss';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

export const BannerSlider = () => {
  const sliderImgs = [
    '/img/phones/iphone16proIMG.jpg',
    '/img/phones/iphone16Pro(2).jpg',
    '/img/phones/iphone16Pro(3).jpg',
  ];
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <>
      <div className={classNames(styles.mainBanner, { container: !isMobile })}>
        {!isMobile && (
          <button className={styles['slider1-prev']}>
            <img src="/img/icons/leftArrowSlider.svg" alt="Prev" />
          </button>
        )}

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          navigation={{
            prevEl: '.slider1-prev',
            nextEl: '.slider1-next',
          }}
          slidesPerView={1}
          className={styles.mainBanner__slider}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {sliderImgs.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt="iphone16PRO"
                className={styles['mainBanner__slider--img']}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {!isMobile && (
          <button className={styles['slider1-next']}>
            <img src="/img/icons/rightArrowSlider.svg" alt="Next" />
          </button>
        )}
      </div>
      <div className="custom-pagination"></div>
    </>
  );
};

export default BannerSlider;
