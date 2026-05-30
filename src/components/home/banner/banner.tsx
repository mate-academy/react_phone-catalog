import React, { useState, useEffect } from 'react';
import styles from './banner.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Navigation, Pagination, Autoplay } from 'swiper/modules';
import classNames from 'classnames';
import banner1 from '../../../assets/images/img/Banner.jpeg';
import banner2 from '../../../assets/images/img/banner2.jpeg';
import banner3 from '../../../assets/images/img/banner3.jpeg';
import bannerSmall from '../../../assets/images/img/image23.png';
import bannerSmall2 from '../../../assets/images/img/banner2Small.jpeg';
import bannerSmall3 from '../../../assets/images/img/banner3Small.jpeg';
import { Link } from 'react-router-dom';

export const Banner: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={classNames(styles.banner)}>
      <div className="container">
        <h2 className={styles.banner_title}>Welcome to Nice Gadgets store!</h2>
      </div>

      <Swiper
        effect={'flip'}
        navigation={{
          nextEl: '#bannerNext',
          prevEl: '#bannerPrev',
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, EffectFlip, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div>
            <button className={styles.button_prev} id={'bannerPrev'}></button>
            <button className={styles.button_next} id={'bannerNext'}></button>
            <img
              src={isSmallScreen ? bannerSmall : banner1}
              alt="Banner"
              className={styles.banner1}
            />
            <Link
              to={'/phones/apple-iphone-14-pro-128gb-gold'}
              className={styles.button_order}
            >
              Order now
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <button className={styles.button_prev} id={'bannerPrev'}></button>
            <button className={styles.button_next} id={'bannerNext'}></button>
            <img
              src={isSmallScreen ? bannerSmall2 : banner2}
              alt=""
              className={styles.banner2}
            />
            <Link
              to={'phones/apple-iphone-13-pro-max-1tb-sierrablue'}
              className={styles.button_order2}
            >
              Order now
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <button className={styles.button_prev} id={'bannerPrev'}></button>
            <button className={styles.button_next} id={'bannerNext'}></button>
            <img
              src={isSmallScreen ? bannerSmall3 : banner3}
              alt=""
              className={styles.banner3}
            />
            <Link
              to={'/phones/apple-iphone-14-128gb-purple'}
              className={styles.button_order3}
            >
              Order now
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
