import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCube } from 'swiper/modules';
import styles from './Banner.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import bannerImageMobile from '../../../img/banner-mobile.png';
import bannerImageDesktop from '../../../img/banner-desktop.png';
import iconArrowLeft from '../../../img/icons/icon-arrow-left.png';
import iconArrowRight from '../../../img/icons/icon-arrow-right.png';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../app/store/GlobalContext';

const banners = [
  { url: 'phones/apple-iphone-14-pro-256gb-spaceblack' },
  { url: 'phones/apple-iphone-14-128gb-midnight' },
  { url: 'phones/apple-iphone-14-128gb-purple' },
];

export const Banner: React.FC = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 640);
  const { products, setSelectedProduct } = useContext(GlobalContext);

  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const bannerImage = isScreenSmall ? bannerImageMobile : bannerImageDesktop;

  return (
    <div className={styles.banner}>
      <div className={styles.banner__container}>
        <h1 className={styles.banner__title}>Welcome to Nice Gadgets store!</h1>
        <Swiper
          effect="cube"
          navigation={{ nextEl: '.bannerNext', prevEl: '.bannerPrev' }}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay, EffectCube]}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {banners.map((banner, index) => {
            const foundProduct = products.find(
              product => product.itemId === itemId,
            );

            return (
              <SwiperSlide key={index}>
                <div className={styles.banner__slider}>
                  <button className={`${styles.button_prev} bannerPrev`}>
                    <img src={iconArrowLeft} alt="Icon-arrow-left" />
                  </button>
                  <button className={`${styles.button_next} bannerNext`}>
                    <img src={iconArrowRight} alt="Icon-arrow-right" />
                  </button>
                  <img
                    src={bannerImage}
                    alt="Banner-image"
                    className={styles.banner__sliderImage}
                  />
                  <button
                    className={styles.banner__sliderButton}
                    onClick={() => {
                      setSelectedProduct(foundProduct || null);
                      navigate(`/${banner.url}`);
                    }}
                  >
                    order now
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
