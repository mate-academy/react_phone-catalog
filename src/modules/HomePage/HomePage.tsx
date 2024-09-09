import React from 'react';
import { BannerSlider } from '../../components/BannerSlider';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductSlider } from '../../components/ProductSlider';
import { MobileSwiper } from '../../components/Swiper';
import { Thumbnails } from '../../components/Thumbnails';
import { PreviousPage } from '../../components/PreviousPage';
import { useLocation } from 'react-router-dom';
import styles from './HomePage.module.scss'

export const HomePage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
    return (
      <div>
        <PreviousPage category= {category}/>
        <Header />
        <h1 className={styles.title}>
          Welcome to Nice Gadgets store!
        </h1>
        <BannerSlider />
        <MobileSwiper />
        <ProductSlider title="Brand new models" sortMethod={'newest'} category={'phones'}/>
        <Thumbnails />
        <ProductSlider title="Hot prices" sortMethod={'hot'} category={'phones'}/>
        <Footer />
      </div>
    );
};
