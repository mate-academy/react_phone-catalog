import React, { useEffect } from 'react';
import { BannerSlider } from '../../components/BannerSlider';
import { ProductSlider } from '../../components/ProductSlider';
import { MobileSwiper } from '../../components/Swiper';
import { Thumbnails } from '../../components/Thumbnails';
import { PreviousPage } from '../../components/PreviousPage';
import { useLocation } from 'react-router-dom';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const category = useLocation().pathname.slice(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div>
      <PreviousPage category={category} />
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <BannerSlider />
      <MobileSwiper />
      <ProductSlider
        title="Brand new models"
        sortMethod={'newest'}
        category={'phones'}
        count={22}
      />
      <Thumbnails />
      <ProductSlider
        title="Hot prices"
        sortMethod={'hot'}
        category={'phones'}
        count={22}
      />
    </div>
  );
};
