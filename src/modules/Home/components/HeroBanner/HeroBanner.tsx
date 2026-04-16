import React from 'react';
import { Link } from 'react-router-dom';

import styles from './HeroBanner.module.scss';

import { useSlider } from '../../../../hooks/useSlider';
import { ArrowButton } from '../../../../components/ArrowButton';

export const HeroBanner: React.FC = () => {
  const banners = [
    {
      id: 1,
      image: `${import.meta.env.BASE_URL}img/banner-phones.png`,
      link: 'phones',
    },
    {
      id: 2,
      image: `${import.meta.env.BASE_URL}img/banner-tablets.png`,
      link: 'tablets',
    },
    {
      id: 3,
      image: `${import.meta.env.BASE_URL}img/banner-accessories.png`,
      link: 'accessories',
    },
  ];

  const { currentIndex, next, prev, goTo, pause, resume } = useSlider({
    mode: 'transform',
    itemsCount: banners.length,
    autoDelay: 5000,
    loop: true,
  });

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.mainContent}>
        <ArrowButton
          className={styles.btn}
          arrowClassName={styles.arrowLeft}
          onClick={prev}
        />

        <div className={styles.window}>
          <div
            className={styles.slidersWrapper}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            {banners.map(banner => (
              <Link to={banner.link} key={banner.id} className={styles.slide}>
                <img src={banner.image} alt="Banner" className={styles.image} />
              </Link>
            ))}
          </div>
        </div>

        <ArrowButton className={styles.btn} onClick={next} />
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
