import React from 'react';
import { BannerSlider } from '../../components/BannerSlider';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductSlider } from '../../components/ProductSlider';
import { MobileSwiper } from '../../components/Swiper';
import { Thumbnails } from '../../components/Thumbnails';
import { PreviousPage } from '../../components/PreviousPage';
import { useLocation } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
    return (
      <div>
        <PreviousPage category= {category}/>
        <Header />
        <BannerSlider />
        <MobileSwiper />
        <ProductSlider title="Brand new models" sortMethod={'newest'} category={'phones'}/>
        <Thumbnails />
        <ProductSlider title="Hot prices" sortMethod={'hot'} category={'phones'}/>
        <Footer />
      </div>
    );
};
