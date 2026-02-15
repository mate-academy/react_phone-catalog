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
      <div className={styles['slider-wrapper']}>
        <button className={`slide-btn__prev ${styles.myCustomBtn__prev}`}>
          <img src="./img/icons/arrow-left.svg" alt="Arrow left" />
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
                      className={styles['slide__title-img']}
                      src="./img/icons/hand.png"
                      alt="ok hand"
                    />
                  </h3>
                  <p className={styles.slide__text}>Be the first!</p>
                  <a className={styles.slide__link} href="#">
                    Order now
                  </a>
                </div>
                <div className={styles.slide__image}>
                  <div className={styles['slide__img-box']}>
                    <h3 className={styles['slide__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide__image-text']}>Pro. Beyond.</p>
                  </div>
                  <img
                    className={styles.slide__img}
                    src="./img/slider/iphone-14.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
            <div className={styles['slide-phone']}>
              <div className={styles['slide-phone__content']}>
                <h3 className={styles['slide-phone__title']}>
                  Now available in our store!
                </h3>
                <div className={styles.slide__image}>
                  <div className={styles['slide-phone__img-box']}>
                    <h3 className={styles['slide-phone__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide-phone__image-text']}>
                      Pro. Beyond.
                    </p>
                  </div>
                  <img
                    className={styles['slide-phone__img']}
                    src="./img/slider/iphone-14-small-screens.png"
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
                      className={styles['slide__title-img']}
                      src="./img/icons/hand.png"
                      alt="ok hand"
                    />
                  </h3>
                  <p className={styles.slide__text}>Be the first!</p>
                  <a className={styles.slide__link} href="#">
                    Order now
                  </a>
                </div>
                <div className={styles.slide__image}>
                  <div className={styles['slide__img-box']}>
                    <h3 className={styles['slide__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide__image-text']}>Pro. Beyond.</p>
                  </div>
                  <img
                    className={styles.slide__img}
                    src="./img/slider/slider-img-2.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
            <div className={styles['slide-phone']}>
              <div className={styles['slide-phone__content']}>
                <h3 className={styles['slide-phone__title']}>
                  Now available in our store!
                </h3>
                <div className={styles.slide__image}>
                  <div className={styles['slide-phone__img-box']}>
                    <h3 className={styles['slide-phone__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide-phone__image-text']}>
                      Pro. Beyond.
                    </p>
                  </div>
                  <img
                    className={styles['slide-phone__img']}
                    src="./img/slider/slider-img-2-small.png"
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
                      className={styles['slide__title-img']}
                      src="./img/icons/hand.png"
                      alt="ok hand"
                    />
                  </h3>
                  <p className={styles.slide__text}>Be the first!</p>
                  <a className={styles.slide__link} href="#">
                    Order now
                  </a>
                </div>
                <div className={styles.slide__image}>
                  <div className={styles['slide__img-box']}>
                    <h3 className={styles['slide__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide__image-text']}>Pro. Beyond.</p>
                  </div>
                  <img
                    className={styles.slide__img}
                    src="./img/slider/slider-img-3.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
            <div className={styles['slide-phone']}>
              <div className={styles['slide-phone__content']}>
                <h3 className={styles['slide-phone__title']}>
                  Now available in our store!
                </h3>
                <div className={styles.slide__image}>
                  <div className={styles['slide-phone__img-box']}>
                    <h3 className={styles['slide-phone__image-title']}>
                      iPhone 14 Pro
                    </h3>
                    <p className={styles['slide-phone__image-text']}>
                      Pro. Beyond.
                    </p>
                  </div>
                  <img
                    className={styles['slide-phone__img']}
                    src="./img/slider/slider-img-3-small.png"
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <button className={`slide-btn__next ${styles.myCustomBtn__next}`}>
          <img src="./img/icons/arrow-right.svg" alt="Arrow right" />
        </button>
      </div>
      <div
        id="main-slider-pagination"
        className={`swiper-pagination ${styles.myPagination}`}
      ></div>
    </>
  );
};
