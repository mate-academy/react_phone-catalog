import { Image } from '../../../../types/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './Slider.module.scss';
import classNames from 'classnames';

type Props = {
  images: Image[];
};

const STEP_DURATION = 5000;
const ANIMATION_DURATION = 100;

export const Slider: React.FC<Props> = ({ images }) => {
  return (
    <div className={classNames(styles.slider)}>
      <div className={classNames(styles.slider__container)}>
        <div
          className={classNames(
            styles.slider__button,
            styles['slider__button--left'],
            'swiper__button--left',
          )}
        ></div>
        <div className={classNames(styles.slider__content)}>
          <Swiper
            className={classNames(styles.slider__swiper)}
            modules={[Autoplay, Navigation, Pagination]}
            loop={true}
            speed={ANIMATION_DURATION}
            autoplay={{
              delay: STEP_DURATION,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.swiper__button--right',
              prevEl: '.swiper__button--left',
            }}
            pagination={{
              el: '.swiper__pagination',
              clickable: true,
              bulletActiveClass: styles['slider__pagination-item--active'],
              renderBullet: (i, className) => {
                return `<span class="${className} ${styles['slider__pagination-item']} custom-bullet"></span>`;
              },
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide
                key={index}
                className={classNames(styles.slider__slide)}
              >
                <a className={classNames(styles.slider__link)}>
                  <img
                    src={`${import.meta.env.BASE_URL}/${img.url}`}
                    alt={img.name}
                    className={classNames(styles.slider__img)}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className={classNames(
            styles.slider__button,
            styles['slider__button--right'],
            'swiper__button--right',
          )}
        ></div>
      </div>
      <div
        className={classNames(styles.slider__pagination, 'swiper__pagination')}
      ></div>
    </div>
  );
};
