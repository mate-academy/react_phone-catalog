/* eslint-disable import/no-extraneous-dependencies */
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Slider.module.scss';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css';

export const Slider = () => {
  return (
    <>
      <div className={styles['slider-container']}>
        <button className={`slide-btn__prev ${styles.button__prev}`}>
          <img src="./img/icons/left_white_arrow.png" alt="Arrow left" />
        </button>
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={{
            nextEl: '.slide-btn__next',
            prevEl: '.slide-btn__prev',
          }}
          pagination={{ clickable: true, el: '#main-slider-pagination' }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className={styles.slide}>
              <div className={styles.slide__wrapper}>
                <div className={styles.slide__content}>
                  <h3 className={styles.slide__title}>
                    Now available in our store!
                    <img
                      className={styles['slide__title-icon']}
                      src="./img/icons/hand.png"
                      alt="hand"
                    />
                  </h3>
                  <p className={styles.slide__text}>Be the first!</p>
                  <a className={styles.slide__link} href="#">
                    Order now
                  </a>
                </div>
                <div className={styles.slide__image}>
                  <div className={styles['slide__image-block']}>
                    <h3 className={styles['slide__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide__image-text']}>Pro. Beyond.</p>
                  </div>
                  <img
                    className={styles.slide__img}
                    src="./img/slide_1.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
            <div className={styles['slide-mobile']}>
              <div className={styles['slide-mobile__content']}>
                <h3 className={styles['slide-mobile__title']}>
                  Now available in our store!
                </h3>
                <div className={styles.slide__image}>
                  <div className={styles['slide-mobile__image-block']}>
                    <h3 className={styles['slide-mobile__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide-mobile__image-text']}>
                      Pro. Beyond.
                    </p>
                  </div>
                  <img
                    className={styles['slide-mobile__img']}
                    src="./img/slide_1_ph.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide}>
              <div className={styles.slide__wrapper}>
                <div className={styles.slide__content}>
                  <h3 className={styles.slide__title}>
                    Now available in our store!
                    <img
                      className={styles['slide__title-icon']}
                      src="./img/icons/hand.png"
                      alt="hand"
                    />
                  </h3>
                  <p className={styles.slide__text}>New Edition!</p>
                  <a className={styles.slide__link} href="#">
                    Buy now
                  </a>
                </div>
                <div className={styles.slide__image}>
                  <div className={styles['slide__image-block']}>
                    <h3 className={styles['slide__image-title']}>
                      iPad 13 Max
                    </h3>
                    <p className={styles['slide__image-text']}>Pro. Beyond.</p>
                  </div>
                  <img
                    className={styles.slide__img}
                    src="./img/category-phones.png"
                    alt="iPad 13 Max"
                  />
                </div>
              </div>
            </div>
            <div className={styles['slide-mobile']}>
              <div className={styles['slide-mobile__content']}>
                <h3 className={styles['slide-mobile__title']}>
                  Now available in our store!
                </h3>
                <div className={styles.slide__image}>
                  <div className={styles['slide-mobile__image-block']}>
                    <h3 className={styles['slide-mobile__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide-mobile__image-text']}>
                      Pro. Beyond.
                    </p>
                  </div>
                  <img
                    className={styles['slide-mobile__img']}
                    src="./img/category-phones-ph.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide}>
              <div className={styles.slide__wrapper}>
                <div className={styles.slide__content}>
                  <h3 className={styles.slide__title}>
                    Now available in our store!
                    <img
                      className={styles['slide__title-icon']}
                      src="./img/icons/hand.png"
                      alt="hand"
                    />
                  </h3>
                  <p className={styles.slide__text}>Be the first!</p>
                  <a className={styles.slide__link} href="#">
                    Shop now
                  </a>
                </div>
                <div className={styles.slide__image}>
                  <div className={styles['slide__image-block']}>
                    <h3 className={styles['slide__image-title']}>
                      iPad 13 Pro
                    </h3>
                    <p className={styles['slide__image-text']}>Pro. Beyond.</p>
                  </div>
                  <img
                    className={styles.slide__img}
                    src="./img/category-tablets.png"
                    alt="iPhone 13 Pro"
                  />
                </div>
              </div>
            </div>
            <div className={styles['slide-mobile']}>
              <div className={styles['slide-mobile__content']}>
                <h3 className={styles['slide-mobile__title']}>
                  Now available in our store!
                </h3>
                <div className={styles.slide__image}>
                  <div className={styles['slide-mobile__image-block']}>
                    <h3 className={styles['slide-mobile__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide-mobile__image-text']}>
                      Pro. Beyond.
                    </p>
                  </div>
                  <img
                    className={styles['slide-mobile__img']}
                    src="./img/category-tablets_ph.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <button className={`slide-btn__next ${styles.button__next}`}>
          <img src="./img/icons/right_white_arrow.svg" alt="Arrow right" />
        </button>
      </div>
      <div
        id="main-slider-pagination"
        className={`swiper-pagination ${styles.sliderPagination}`}
      ></div>
    </>
  );
};

export default Slider;
