import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './BannerSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './SwiperStyles.scss';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import ArrowNav from '../shared/components/ArrowNav';
import { Direction } from '../shared/components/ArrowNav/ArrowNav';

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
          <ArrowNav classname={'BannerPrevButton'} direction={Direction.Left} />
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          navigation={{
            nextEl: '.BannerNextButton',
            prevEl: '.BannerPrevButton',
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
          <ArrowNav
            classname={'BannerNextButton'}
            direction={Direction.Right}
          />
        )}
      </div>
      <div className="custom-pagination"></div>
    </>
  );
};

export default BannerSlider;
