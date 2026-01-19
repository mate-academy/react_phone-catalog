/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import 'swiper/css';
import 'swiper/css/navigation';

import { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay, Mousewheel, Pagination } from 'swiper/modules';

import styles from './BannerSwiper.module.scss';
import classNames from 'classnames';
import { SwiperOptions } from 'swiper/types';
import { useIsMobile } from '../../utils/hooks/UI/useIsMobile';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../types/RoutePath';
import { Link } from 'react-router-dom';

const autoplayConfig = {
  delay: 5000,
  disableOnInteraction: false,
  // pauseOnMouseEnter: true,
};

export const bannerSwiperConfig: SwiperOptions = {
  modules: [Navigation, Autoplay, Pagination, Mousewheel],
  slidesPerView: 1,
  loop: true,
  autoplay: autoplayConfig,
  mousewheel: {
    forceToAxis: true,
  },
};

export const BannerSwiper = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useIsMobile();

  const swiperRef = useRef<SwiperType | null>(null);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const syncNavState = useCallback((swiper: SwiperType) => {
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  }, []);

  const { t } = useTranslation();

  return (
    <section className={styles.bannerSwiper}>
      <div className={styles.bannerSwiper__swiper}>
        <button
          ref={prevRef}
          disabled={isPrevDisabled}
          aria-disabled={isPrevDisabled}
          className={classNames(
            'button button--pading',
            styles.bannerSwiper__prevButton,
            isPrevDisabled ? 'button--disabled' : 'button--icon',
          )}
        >
          <span
            className={classNames(
              'icon icon--rotate180',
              isPrevDisabled
                ? 'icon--chevron-disabled'
                : 'icon--chevron-active',
            )}
          />
        </button>
        <Swiper
          {...bannerSwiperConfig}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          onSlideChange={swiper => {
            if (!isMobile) {
              syncNavState(swiper);
            }
          }}
          navigation={
            isMobile
              ? false
              : {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
          }
          pagination={{
            el: paginationRef.current,
            type: 'bullets',
            clickable: true,
          }}
        >
          <SwiperSlide>
            <div className={styles.bannerSwiper__slide}>
              <div className={styles.bannerSwiper__slideLeft}>
                <div className={styles.bannerSwiper__slideContent}>
                  <div>
                    <h2 className={styles.bannerSwiper__slideTitle}>
                      {t('banner.title1')}
                    </h2>
                    <p className={styles.bannerSwiper__slideDescription}>
                      {t('banner.description1')}
                    </p>
                  </div>
                  <Link
                    to={RoutePath.Tablets}
                    className={classNames(
                      'button button--transparent',
                      styles.bannerSwiper__slideButton,
                    )}
                  >
                    {t('banner.orderNow')}
                  </Link>
                </div>
              </div>

              <div className={styles.bannerSwiper__slideRight}>
                <div className={styles.bannerSwiper__imageTextWrapper}>
                  <h4 className={styles.bannerSwiper__imageTitle}>
                    {t('banner.title1')}
                  </h4>
                  <h2 className={styles.bannerSwiper__imageProductText}>
                    iPhone 14 Pro
                  </h2>
                  <p className={styles.bannerSwiper__imageDescription}>
                    Pro.Beyound.
                  </p>
                </div>
                <img
                  className={styles.bannerSwiper__slideImage}
                  src="/img/banner-iphone14.png"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.bannerSwiper__slide}>
              <div className={styles.bannerSwiper__slideLeft}>
                <div className={styles.bannerSwiper__slideContent}>
                  <div>
                    <h2 className={styles.bannerSwiper__slideTitle}>
                      {t('banner.title1')}
                    </h2>
                    <p className={styles.bannerSwiper__slideDescription}>
                      {t('banner.description1')}
                    </p>
                  </div>
                  <Link
                    to={RoutePath.Tablets}
                    className={classNames(
                      'button button--transparent',
                      styles.bannerSwiper__slideButton,
                    )}
                  >
                    {t('banner.orderNow')}
                  </Link>
                </div>
              </div>

              <div className={styles.bannerSwiper__slideRight}>
                <div className={styles.bannerSwiper__imageTextWrapper}>
                  <h4 className={styles.bannerSwiper__imageTitle}>
                    {t('banner.title1')}
                  </h4>
                  <h2 className={styles.bannerSwiper__imageProductText}>
                    iPhone 14 Pro
                  </h2>
                  <p className={styles.bannerSwiper__imageDescription}>
                    Pro.Beyound.
                  </p>
                </div>
                <img
                  className={styles.bannerSwiper__slideImage}
                  src="/img/banner-iphone14.png"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.bannerSwiper__slide}>
              <div className={styles.bannerSwiper__slideLeft}>
                <div className={styles.bannerSwiper__slideContent}>
                  <div>
                    <h2 className={styles.bannerSwiper__slideTitle}>
                      {t('banner.title1')}
                    </h2>
                    <p className={styles.bannerSwiper__slideDescription}>
                      {t('banner.description1')}
                    </p>
                  </div>
                  <Link
                    to={RoutePath.Tablets}
                    className={classNames(
                      'button button--transparent',
                      styles.bannerSwiper__slideButton,
                    )}
                  >
                    {t('banner.orderNow')}
                  </Link>
                </div>
              </div>

              <div className={styles.bannerSwiper__slideRight}>
                <div className={styles.bannerSwiper__imageTextWrapper}>
                  <h4 className={styles.bannerSwiper__imageTitle}>
                    {t('banner.title1')}
                  </h4>
                  <h2 className={styles.bannerSwiper__imageProductText}>
                    iPhone 14 Pro
                  </h2>
                  <p className={styles.bannerSwiper__imageDescription}>
                    Pro.Beyound.
                  </p>
                </div>
                <img
                  className={styles.bannerSwiper__slideImage}
                  src="/img/banner-iphone14.png"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <button
          ref={nextRef}
          disabled={isNextDisabled}
          aria-disabled={isNextDisabled}
          className={classNames(
            'button button--pading',
            styles.bannerSwiper__nextButton,
            isNextDisabled ? 'button--disabled' : 'button--icon',
          )}
        >
          <span
            className={classNames(
              'icon',
              isNextDisabled
                ? 'icon--chevron-disabled'
                : 'icon--chevron-active',
            )}
          />
        </button>
      </div>

      <div ref={paginationRef} className="bannerSwiper__pagination" />
    </section>
  );
};
