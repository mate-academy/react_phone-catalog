import React from 'react';

import styles from './SectionWelcome.module.scss';
import { Carousel } from '../../../shared/components/carousel';

export const SectionWelcome: React.FC = () => {
  const banners = [
    'img/banner-img/banner-accessories.png',
    'img/banner-img/banner-phones.png',
    'img/banner-img/banner-tablets.png',
  ];

  return (
    <section className={styles.welcome}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.positionsCarousel}>
        <Carousel>
          {banners.map(b => (
            <Carousel.Item key={b}>
              <img src={b} alt="" className={styles.carouselImg} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default SectionWelcome;
