import React from 'react';
import styles from './HomePage.module.scss';
import Slider from '../../componenst/Slider/Slider';

const bannerSlides = [
  { id: 'b-phones', image: '/img/banner-phones.png', link: '/phones' },
  { id: 'b-tablets', image: '/img/banner-tablets.png', link: '/tablets' },
  {
    id: 'b-accessories',
    image: '/img/banner-accessories.png',
    link: '/accessories',
  },
];

const HomePage: React.FC = () => (
  <section className={styles.homePage}>
    <div className={styles.homePage__banner}>
      <h2 className={styles.homePage__banner__text}>
        Welcome to Nice Gadgets store!
      </h2>
    </div>
    <div className={styles.sliderRow}>
      <Slider slides={bannerSlides} />
    </div>
  </section>
);

export default HomePage;
