import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCube } from 'swiper/modules';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import bannerBig from '../../../assets/img/banners/banner-big.png';
import bannerSmall from '../../../assets/img/banners/banner-small.png';
import styles from './Banner.module.scss';

const banners = [
  { linkTo: 'phones/apple-iphone-14-pro-128gb-spaceblack' },
  { linkTo: 'phones/apple-iphone-14-pro-128gb-gold' },
  { linkTo: 'phones/apple-iphone-14-pro-256gb-gold' },
];

export const Banner: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 640);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bannerImage = isSmallScreen ? bannerSmall : bannerBig;

  return (
    <section className={styles.slaider}>
      <h2 className={styles.slaider_title}>Welcome to Nice Gadgets store!</h2>

      <Swiper
        effect="cube"
        navigation={{ nextEl: '.bannerNext', prevEl: '.bannerPrev' }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, EffectCube, Autoplay]}
        loop
        autoplay={{ delay: 12000, disableOnInteraction: false }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div>
              <button className={`${styles.button_prev} bannerPrev`}></button>
              <button className={`${styles.button_next} bannerNext`}></button>
              <img
                src={bannerImage}
                alt="Banner"
                className={styles.slaider_banner}
              />
              <Link to={banner.linkTo} className={styles.slaider_button}>
                Order now
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
